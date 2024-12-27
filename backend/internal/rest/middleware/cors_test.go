package middleware_test

import (
	"net/http"
	httptest "net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/neilchetna/planner-webapp/backend/internal/rest/middleware"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCORS(t *testing.T) {
	e := echo.New()

	req := httptest.NewRequest(echo.GET, "/", nil)
	res := httptest.NewRecorder()

	c := e.NewContext(req, res)

	h := middleware.CORS(echo.HandlerFunc(func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	}))

	err := h(c)
	require.NoError(t, err)
	assert.Equal(t, "*", res.Header().Get("Access-Control-Allow-Origin"))
}
