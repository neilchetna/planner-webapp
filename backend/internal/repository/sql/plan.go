package sqlrepository

import (
	"context"
	"errors"

	"github.com/neilchetna/planner-webapp/backend/models"
	"gorm.io/gorm"
)

type PlanRepository struct {
	db *gorm.DB
}

func NewPlanRepositoryBuilder(db *gorm.DB) *PlanRepository {
	return &PlanRepository{db}
}

func (m *PlanRepository) Create(ctx context.Context, plan *models.Plan) error {
	result := m.db.Omit("ID").Create(plan)

	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (m *PlanRepository) Query(ctx context.Context, limit int) ([]models.Plan, error) {
	var plans []models.Plan
	result := m.db.Limit(limit).Find(&plans).Preload("Tasks")
	if result.Error != nil {
		return nil, result.Error
	}
	return plans, nil
}

func (m *PlanRepository) Update(ctx context.Context, plan *models.Plan) error {
	if plan.ID == 0 {
		return errors.New("plan id not found")
	}

	result := m.db.Model(&models.Plan{}).Where("id = ?", plan.ID).Omit("ID").Updates(plan)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (m *PlanRepository) Get(ctx context.Context, id uint) (models.Plan, error) {
	var plan models.Plan
	result := m.db.First(&plan, "id = ?", id)

	if result.Error != nil {
		return plan, result.Error
	}

	return plan, nil
}

func (m *PlanRepository) Delete(ctx context.Context, id uint) error {
	result := m.db.Delete(&models.Plan{}, id)

	return result.Error
}
