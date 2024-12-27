package models

import "time"

type Plan struct {
	ID        int64     `json:"id"`
	Title     string    `json:"title" validate:"required"`
	Icon      string    `json:"icon"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Tasks     []Task    `json:"tasks"`
}
