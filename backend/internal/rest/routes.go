package rest

import (
	"github.com/labstack/echo/v4"
	sqlRepository "github.com/neilchetna/planner-webapp/backend/internal/repository/sql"
	"github.com/neilchetna/planner-webapp/backend/internal/rest/handlers"
	"github.com/neilchetna/planner-webapp/backend/internal/rest/middleware"
	"github.com/neilchetna/planner-webapp/backend/services/plan"
	"github.com/neilchetna/planner-webapp/backend/services/task"
	"gorm.io/gorm"
)

func BuildRoutes(e *echo.Echo, db *gorm.DB) {
	bindMiddlewares(e)

	// Root
	e.GET("/", handlers.RootHandler)

	// Plan
	planGroup := e.Group("/plan")
	planRepo := sqlRepository.NewPlanRepositoryBuilder(db)
	planService := plan.PlanServiceBuilder(planRepo)
	handlers.NewPlanHandler(planGroup, planService)

	// Task
	taskGroup := e.Group("/plan/:planId/task")
	taskRepo := sqlRepository.NewTaskRepositoryBuilder(db)
	taskService := task.TaskServiceBuilder(taskRepo)
	handlers.NewTaskHandler(taskGroup, taskService)

}

func bindMiddlewares(e *echo.Echo) {
	// e.Use(middleware.Authenticate)
	e.Use(middleware.CORS)
}
