package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/neilchetna/planner-webapp/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file")
	}

	dbHost := os.Getenv("PG_HOST")
	dbPort := os.Getenv("PG_PORT")
	dbUser := os.Getenv("PG_USER")
	dbPass := os.Getenv("PG_PASSWORD")
	dbName := os.Getenv("PG_DB_NAME")

	connectionString := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", dbUser, dbPass, dbHost, dbPort, dbName)

	var config gorm.Config
	db, err := gorm.Open(postgres.Open(connectionString), &config)
	if err != nil {
		log.Fatalf("error opening database: %v", err)
	}

	migrator := db.Migrator()

	var plan models.Plan
	var task models.Task

	err = migrator.AutoMigrate(&plan, &task)
	if err != nil {
		log.Fatalf("error migrating data: %v", err)
	}

	log.Print("migrations done successfully")
}
