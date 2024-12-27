package middleware

import (
	"log"
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func Authenticate(next echo.HandlerFunc) echo.HandlerFunc {
	config := jwtConfigFactory()

	return echojwt.WithConfig(config)(next)
}

func jwtConfigFactory() echojwt.Config {

	publicKey, err := parseRASPublicKeyFromPEM([]byte(os.Getenv("CLERK_PEM")))

	if err != nil {
		log.Fatalf("Error parsing public key: %v", err)
	}

	return echojwt.Config{
		SigningKey:    publicKey,
		SigningMethod: "RS256",
		TokenLookup:   "header:Authorization:Bearer ",
	}
}
