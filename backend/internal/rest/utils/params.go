package utils

import (
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func ParseIDParam(c echo.Context, key string) (uuid.UUID, error) {
	param := c.Param(key)

	id, err := uuid.Parse(param)

	if err != nil {
		return uuid.Nil, err
	}

	return id, nil
}
