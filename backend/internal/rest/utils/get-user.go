package utils

import (
	"errors"
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/neilchetna/planner-webapp/backend/models"
)

func GetUserFromContext(c echo.Context) (*models.User, error) {
	user, ok := c.Get(User).(models.User)
	fmt.Print(user)
	if !ok {
		return nil, errors.New("user not present in context")
	}
	return &user, nil
}
