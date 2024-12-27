package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func RootHandler(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Welcome to the Do-mosh API!",
		"version": "1.0.0",
		"status":  "running",
	})
}
