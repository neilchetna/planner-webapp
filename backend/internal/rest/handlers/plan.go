package handlers

import (
	"context"
	"errors"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/neilchetna/planner-webapp/backend/internal/constants"
	"github.com/neilchetna/planner-webapp/backend/internal/rest/utils"
	"github.com/neilchetna/planner-webapp/backend/models"
	"gorm.io/gorm"
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

func NewPlanHandler(g *echo.Group, svc PlanService) {
	handler := &PlanHandler{Service: svc}

	g.POST("", handler.Create)
	g.GET("", handler.Query)
	g.PATCH("/:id", handler.Update)
	g.GET("/:id", handler.Get)
	g.DELETE("/:id", handler.Delete)
}

func validatePlan(m *models.Plan) (bool, error) {
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
	if ok, err = validatePlan(&plan); !ok {
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
	planId, _ := utils.ParamUint(c, "id")
	var plan models.Plan
	plan.ID = planId

	err := c.Bind(&plan)
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
	planId, _ := utils.ParamUint(c, "id")

	ctx := c.Request().Context()
	var plan models.Plan
	plan, err := a.Service.Get(ctx, planId)

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.JSON(http.StatusNotFound, "Plan not found")
	} else if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, plan)
}

func (a *PlanHandler) Query(c echo.Context) error {
	limitParam := c.QueryParam("limit")
	limit, err := strconv.ParseInt(limitParam, 10, 64)
	if err != nil {
		limit = constants.DefaultQueryLimit
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
	planId, _ := utils.ParamUint(c, "id")

	ctx := c.Request().Context()
	err := a.Service.Delete(ctx, planId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.NoContent(http.StatusNoContent)
}
