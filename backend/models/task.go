package models

import (
	"database/sql"

	"github.com/google/uuid"
)

type Task struct {
	BaseModel
	Title       string       `json:"title" validate:"required"`
	Description string       `json:"description"`
	StartedAt   sql.NullTime `json:"startedAt"`
	DueDate     sql.NullTime `json:"dueDate"`
	PlanId      uuid.UUID    `gorm:"type:uuid" json:"planId"`
}
