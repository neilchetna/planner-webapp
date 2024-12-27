package models

import "time"

type Task struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title" validate:"required"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	StartedAt   time.Time `json:"startedAt"`
	DueDate     time.Time `json:"DueDate"`
}
