package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type BaseModel struct {
	ID        uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}

func (b *BaseModel) BeforeCreate(tx *gorm.DB) (err error) {
	uuid, err := uuid.NewV7()

	if err != nil {
		return err
	}

	b.ID = uuid
	return
}
