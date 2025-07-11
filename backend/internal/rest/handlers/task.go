package handlers

import (
	"context"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/neilchetna/planner-webapp/backend/internal/rest/utils"
	"github.com/neilchetna/planner-webapp/backend/models"
)

type TaskService interface {
	Create(ctx context.Context, task *models.Task) error
	Delete(ctx context.Context, id uuid.UUID) error
	Update(ctx context.Context, taskID uuid.UUID, taskInput *models.UpdateTaskInput) (*models.Task, error)
}

type TaskHandler struct {
	Service TaskService
}

func NewTaskHandler(g *echo.Group, svc TaskService) {
	handler := &TaskHandler{Service: svc}

	g.POST("", handler.Create)
	g.DELETE("/:taskId", handler.Delete)
	g.PATCH("/:taskId", handler.Update)
}

// TODO: Look into better practice to writing validators
func validateTask(m *models.Task) (bool, error) {
	validator := validator.New()
	err := validator.Struct(m)

	if err != nil {
		return false, err
	}

	return true, err
}

func (a *TaskHandler) Create(c echo.Context) error {
	planId, err := utils.ParseIDParam(c, "planId")
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid plan id")
	}

	user := c.Get(utils.User).(*models.User)
	task := models.Task{PlanId: planId, UserId: user.ID}

	err = c.Bind(&task)

	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, err.Error())
	}

	if ok, err := validateTask(&task); !ok {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	ctx := c.Request().Context()
	err = a.Service.Create(ctx, &task)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, &task)
}

func (a *TaskHandler) Delete(c echo.Context) error {
	taskId, err := utils.ParseIDParam(c, "taskId")
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid task ID")
	}
	ctx := c.Request().Context()
	err = a.Service.Delete(ctx, taskId)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (a *TaskHandler) Update(c echo.Context) error {
	taskId, err := utils.ParseIDParam(c, "taskId")
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid task ID")
	}

	var input models.UpdateTaskInput
	err = c.Bind(&input)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, err.Error())
	}

	ctx := c.Request().Context()
	task, err := a.Service.Update(ctx, taskId, &input)
	if err != nil {
		if err == models.ErrNotFound {
			return c.JSON(http.StatusNotFound, err.Error())
		}
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, task)
}
