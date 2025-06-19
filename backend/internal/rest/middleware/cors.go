package middleware

import "github.com/labstack/echo/v4"

func CORS(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		res := c.Response().Header()
		res.Set("Access-Control-Allow-Origin", "*")
		res.Set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")
		res.Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
		return next(c)
	}
}
