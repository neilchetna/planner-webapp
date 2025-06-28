package task

import (
	"context"

	"github.com/google/uuid"
	"github.com/neilchetna/planner-webapp/backend/models"
)

type TaskRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (models.Task, error)
	Create(ctx context.Context, task *models.Task) error
	Delete(ctx context.Context, id uuid.UUID) error
	Update(ctx context.Context, task *models.Task) error
}

type Service struct {
	taskRepo TaskRepository
}

func TaskServiceBuilder(t TaskRepository) *Service {
	return &Service{taskRepo: t}
}

func (t *Service) Create(ctx context.Context, task *models.Task) error {
	err := t.taskRepo.Create(ctx, task)

	if err != nil {
		return err
	}

	return nil
}

func (t *Service) Delete(ctx context.Context, id uuid.UUID) error {
	err := t.taskRepo.Delete(ctx, id)

	if err != nil {
		return err
	}

	return nil
}

func (t *Service) Update(ctx context.Context, taskId uuid.UUID, taskInput *models.UpdateTaskInput) (*models.Task, error) {
	task, err := t.taskRepo.GetByID(ctx, taskId)
	if err != nil {
		return nil, models.ErrNotFound
	}

	if taskInput.Title != nil {
		task.Title = *taskInput.Title
	}
	if taskInput.Description != nil {
		task.Description = *taskInput.Description
	}
	if taskInput.Status != nil {
		task.Status = *taskInput.Status
	}

	err = t.taskRepo.Update(ctx, &task)

	if err != nil {
		return nil, err
	}
	return &task, nil
}
