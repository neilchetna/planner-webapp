package sqlrepository

import (
	"context"
	"errors"

	"github.com/neilchetna/planner-webapp/backend/models"
	"gorm.io/gorm"
)

type TaskRepository struct {
	db *gorm.DB
}

func NewTaskRepositoryBuilder(db *gorm.DB) *TaskRepository {
	return &TaskRepository{db}
}

func (m *TaskRepository) Create(ctx context.Context, task *models.Task) error {
	res := m.db.WithContext(ctx).Omit("ID").Create(task)

	if res.Error != nil {
		return res.Error
	}

	return nil
}

func (m *TaskRepository) Delete(ctx context.Context, id uint) error {
	res := m.db.WithContext(ctx).Delete(&models.Task{}, id)

	if res.Error != nil {
		return res.Error
	}

	return nil
}

func (m *TaskRepository) Update(ctx context.Context, task *models.Task) error {
	if task.ID == 0 {
		return errors.New("task id not found")
	}
	res := m.db.WithContext(ctx).Model(&models.Task{}).Where("id = ?", task.ID).Omit("ID").Updates(task)
	if res.Error != nil {
		return res.Error
	}

	return nil
}
