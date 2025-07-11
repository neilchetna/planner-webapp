package middleware

import (
	"net/http"

	"github.com/labstack/echo/v4"
	sqlRepository "github.com/neilchetna/planner-webapp/backend/internal/repository/sql"
	"github.com/neilchetna/planner-webapp/backend/internal/rest/utils"
	"github.com/neilchetna/planner-webapp/backend/services/user"
	"gorm.io/gorm"
)

func SyncUser(db *gorm.DB) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			ctx := c.Request().Context()
			clerkUserId, ok := c.Get(utils.ClerkUserId).(string)
			if !ok {
				return echo.ErrUnauthorized
			}
			userRepo := sqlRepository.UserRepositoryBuilder(db)
			userService := user.UserServiceBuilder(userRepo)

			user, err := userService.SyncClerkUser(ctx, clerkUserId)

			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
			}

			c.Set(utils.User, user)
			return next(c)
		}
	}
}
