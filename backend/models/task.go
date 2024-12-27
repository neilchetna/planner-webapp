package models

import (
	"database/sql"
)

type Task struct {
	BaseModel
	Title       string       `json:"title" validate:"required"`
	Description string       `json:"description"`
	StartedAt   sql.NullTime `json:"startedAt"`
	DueDate     sql.NullTime `json:"DueDate"`
	PlanId      uint         `json:"planId"`
}
