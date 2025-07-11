package models

import (
	"database/sql"

	"github.com/google/uuid"
	"gorm.io/gorm"
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
	UserId      uuid.UUID    `gorm:"type:uuid" json:"userId"`
}

func (t *Task) BeforeSave(tx *gorm.DB) (err error) {
	if t.UserId == uuid.Nil {
		return ErrUserIdNull
	}

	return
}

type UpdateTaskInput struct {
	Title       *string `json:"title"`
	Description *string `json:"description"`
	Status      *Status `json:"status"`
}
