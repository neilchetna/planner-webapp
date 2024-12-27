package main

import (
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/neilchetna/planner-webapp/backend/internal/rest"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	_ "github.com/lib/pq"
)

func connectToDatabase() (*gorm.DB, error) {
	dbHost := os.Getenv("PG_HOST")
	dbPort := os.Getenv("PG_PORT")
	dbUser := os.Getenv("PG_USER")
	dbPass := os.Getenv("PG_PASSWORD")
	dbName := os.Getenv("PG_DB_NAME")

	connectionString := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", dbUser, dbPass, dbHost, dbPort, dbName)

	var config gorm.Config
	db, err := gorm.Open(postgres.Open(connectionString), &config)
	if err != nil {
		return nil, fmt.Errorf("error opening database: %w", err)
	}

	pool, err := db.DB()
	if err != nil {
		return nil, errors.New("failed to connect to PostgreSQL database")
	}

	if err := pool.Ping(); err != nil {
		return nil, fmt.Errorf("error connecting to the database: %v", err)
	}

	return db, nil
}

func startHTTPServer(db *gorm.DB) error {
	e := echo.New()

	e.Use(middleware.Logger())

	rest.BuildRoutes(e, db)

	const defaultAddress = ":8080"
	return e.Start(defaultAddress)
}

func main() {
	// Load env variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file")
	}

	// Connect to the database
	db, err := connectToDatabase()
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	pool, _ := db.DB()
	defer pool.Close()

	// Build and start HTTP server
	if err := startHTTPServer(db); err != nil {
		log.Fatal(err)
	}

}
