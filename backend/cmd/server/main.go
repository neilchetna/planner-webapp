package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

func main() {
	// connect to the database
	dbHost := "localhost"
	dbPort := "5432"
	dbUser := "postgres"
	dbPass := "password"
	dbName := "postgres"

	connectionString := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", dbUser, dbPass, dbHost, dbPort, dbName)

	// Connect to the database
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	defer db.Close()

	// Verify the connection
	if err := db.Ping(); err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	} else {
		fmt.Println("Successfully connected to the database!")
	}

	// build HTTP server
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	const defaultAddress = ":8080"
	if err := e.Start(defaultAddress); err != http.ErrServerClosed {
		log.Fatal(err)
	}

}
