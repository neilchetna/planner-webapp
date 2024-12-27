package handlers

import (
	"context"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/neilchetna/planner-webapp/backend/models"
)

type PlanService interface {
	Create(ctx context.Context, plan *models.Plan) error
	Query(ctx context.Context, limit int) ([]models.Plan, error)
	Update(ctx context.Context, plan *models.Plan) error
	Get(ctx context.Context, id uint) (models.Plan, error)
	Delete(ctx context.Context, id uint) error
}

type PlanDTO struct {
	Title string `json:"title" validate:"required"`
	Icon  string `json:"icon"`
}

type PlanHandler struct {
	Service PlanService
}

// TODO: Move into appropriate file and set this default for all items
const defaultLimit = 10

func NewPlanHandler(g *echo.Group, svc PlanService) {
	handler := &PlanHandler{Service: svc}

	g.POST("", handler.Create)
	g.GET("", handler.Query)
	g.PATCH("/:id", handler.Update)
	g.GET("/:id", handler.Get)
	g.DELETE("/:id", handler.Delete)
}

func isRequestValid(m *models.Plan) (bool, error) {
	validator := validator.New()
	err := validator.Struct(m)

	if err != nil {
		return false, err
	}

	return true, nil
}

func (a *PlanHandler) Create(c echo.Context) error {
	var plan models.Plan

	err := c.Bind(&plan)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, err.Error())
	}

	var ok bool
	if ok, err = isRequestValid(&plan); !ok {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	ctx := c.Request().Context()
	err = a.Service.Create(ctx, &plan)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusCreated, plan)
}

func (a *PlanHandler) Update(c echo.Context) error {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	var plan models.Plan
	plan.ID = uint(id)

	err = c.Bind(&plan)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, err.Error())
	}

	ctx := c.Request().Context()
	err = a.Service.Update(ctx, &plan)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, plan)
}

func (a *PlanHandler) Get(c echo.Context) error {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	ctx := c.Request().Context()
	var plan models.Plan
	plan, err = a.Service.Get(ctx, uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, plan)
}

func (a *PlanHandler) Query(c echo.Context) error {
	limitParam := c.QueryParam("limit")
	limit, err := strconv.ParseInt(limitParam, 10, 64)
	if err != nil {
		limit = defaultLimit
	}

	ctx := c.Request().Context()
	var plans []models.Plan
	plans, err = a.Service.Query(ctx, int(limit))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, plans)
}

func (a *PlanHandler) Delete(c echo.Context) error {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	ctx := c.Request().Context()
	err = a.Service.Delete(ctx, uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.NoContent(http.StatusNoContent)
}
