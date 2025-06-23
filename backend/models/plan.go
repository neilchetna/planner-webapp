package models

type Plan struct {
	BaseModel
	Title string `json:"title,omitempty" validate:"required"`
	Icon  string `json:"icon"`
	Tasks []Task `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"tasks"`
}
