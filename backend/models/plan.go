package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Plan struct {
	BaseModel
	Title  string    `json:"title" validate:"required"`
	Icon   string    `json:"icon"`
	UserId uuid.UUID `gorm:"type:uuid" json:"userId"`
	Tasks  []Task    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"tasks,omitempty"`
}

func (p *Plan) BeforeSave(tx *gorm.DB) (err error) {
	if p.UserId == uuid.Nil {
		return ErrUserIdNull
	}

	return
}

type UpdatePlanInput struct {
	Title *string `json:"title"`
	Icon  *string `json:"icon"`
}
