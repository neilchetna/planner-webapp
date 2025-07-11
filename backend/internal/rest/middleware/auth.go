package middleware

import (
	"net/http"
	"strings"

	jwt "github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/labstack/echo/v4"
	"github.com/neilchetna/planner-webapp/backend/internal/rest/utils"
)

func Authenticate(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		sessionToken := strings.TrimPrefix(c.Request().Header.Get(echo.HeaderAuthorization), "Bearer ")

		ctx := c.Request().Context()
		claims, err := jwt.Verify(ctx, &jwt.VerifyParams{
			Token: sessionToken,
		})

		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Provide valid credentials")
		}

		c.Set(utils.ClerkUserId, claims.Subject)
		return next(c)
	}
}
