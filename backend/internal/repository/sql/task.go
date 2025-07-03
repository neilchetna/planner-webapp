package sqlrepository

import (
	"context"
	"errors"

	"github.com/google/uuid"
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
	res := m.db.WithContext(ctx).Create(task)

	if res.Error != nil {
		return res.Error
	}

	return nil
}

func (m *TaskRepository) Delete(ctx context.Context, id uuid.UUID) error {
	res := m.db.WithContext(ctx).Delete(&models.Task{}, id)

	if res.Error != nil {
		return res.Error
	}

	return nil
}

func (m *TaskRepository) Update(ctx context.Context, task *models.Task) error {
	if task.ID == uuid.Nil {
		return errors.New("task's 'id' is not valid")
	}
	res := m.db.WithContext(ctx).Model(&models.Task{}).Where("id = ?", task.ID).Omit("ID").Updates(task)
	if res.Error != nil {
		return res.Error
	}

	return nil
}

func (m *TaskRepository) GetByID(ctx context.Context, id uuid.UUID) (models.Task, error) {
	var task models.Task

	res := m.db.WithContext(ctx).First(&task, "id = ?", id)

	if res.Error != nil {
		return task, res.Error
	}

	return task, nil
}
