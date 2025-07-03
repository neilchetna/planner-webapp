package models

import (
	"database/sql"

	"github.com/google/uuid"
)

type Status string

const (
	StatusTodo      Status = "todo"
	StatusCompleted Status = "completed"
)

type Task struct {
	BaseModel
	Title       string       `json:"title" validate:"required"`
	Description string       `json:"description"`
	Status      Status       `json:"status" gorm:"type:VARCHAR(20);default:todo"`
	StartedAt   sql.NullTime `json:"startedAt"`
	DueDate     sql.NullTime `json:"dueDate"`
	PlanId      uuid.UUID    `gorm:"type:uuid" json:"planId"`
}

type UpdateTaskInput struct {
	Title       *string `json:"title"`
	Description *string `json:"description"`
	Status      *Status `json:"status"`
}
