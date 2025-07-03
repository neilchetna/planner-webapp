package models

type Plan struct {
	BaseModel
	Title string `json:"title" validate:"required"`
	Icon  string `json:"icon"`
	Tasks []Task `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"tasks,omitempty"`
}

type UpdatePlanInput struct {
	Title *string `json:"title"`
	Icon  *string `json:"icon"`
}
