package models

type User struct {
	BaseModel
	Email       string `json:"email" validate:"required" gorm:"not null"`
	Avatar      string `json:"avatar" gorm:"type:varchar(255)"`
	ClerkUserId string `json:"clerkUserId" gorm:"uniqueIndex;not null"`
}

type UserInput struct {
	Email       string `json:"email" validate:"required"`
	ClerkUserId string `json:"clerkUserId" validate:"required"`
}
