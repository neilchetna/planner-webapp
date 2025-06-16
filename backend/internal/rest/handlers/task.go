package handlers

import (
	"context"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/neilchetna/planner-webapp/backend/internal/rest/utils"
	"github.com/neilchetna/planner-webapp/backend/models"
)

type TaskService interface {
	Create(ctx context.Context, task *models.Task) error
	Delete(ctx context.Context, id uint) error
	Update(ctx context.Context, task *models.Task) error
}

type TaskDTO struct {
	Title       string `json:"title" validate:"required"`
	Description string `json:"description"`
	DueDate     string `json:"dueDate"`
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
	planId, _ := utils.ParamUint(c, "planId")
	task := models.Task{PlanId: uint(planId)}

	err := c.Bind(&task)

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
	taskId, _ := utils.ParamUint(c, "taskId")
	ctx := c.Request().Context()
	err := a.Service.Delete(ctx, taskId)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (a *TaskHandler) Update(c echo.Context) error {
	taskId, _ := utils.ParamUint(c, "taskId")

	var task models.Task
	task.ID = taskId
	err := c.Bind(&task)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, err.Error())
	}

	ctx := c.Request().Context()
	err = a.Service.Update(ctx, &task)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, task)
}
