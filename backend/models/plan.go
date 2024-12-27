package models

type Plan struct {
	BaseModel
	Title string `json:"title" validate:"required"`
	Icon  string `json:"icon"`
	Tasks []Task `gorm:"foreignKey:PlanId" json:"tasks"`
}
