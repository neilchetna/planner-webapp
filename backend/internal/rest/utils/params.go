package utils

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func ParamUint(c echo.Context, key string) (uint, error) {
	param := c.Param(key)
	id, err := strconv.ParseInt(param, 10, 64)
	if err != nil {
		return 0, c.JSON(http.StatusBadRequest, "Invalid "+key+" value")
	}
	return uint(id), nil
}
