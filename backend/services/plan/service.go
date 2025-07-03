package plan

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/neilchetna/planner-webapp/backend/models"
)

type PlanRepository interface {
	Create(ctx context.Context, plan *models.Plan) error
	Query(ctx context.Context, limit int) ([]models.Plan, error)
	Update(ctx context.Context, plan *models.Plan) error
	Get(ctx context.Context, id uuid.UUID) (models.Plan, error)
	Delete(ctx context.Context, id uuid.UUID) error
}

type Service struct {
	planRepo PlanRepository
}

func PlanServiceBuilder(p PlanRepository) *Service {
	return &Service{
		planRepo: p,
	}
}

func (p *Service) Query(ctx context.Context, limit int) ([]models.Plan, error) {
	res, err := p.planRepo.Query(ctx, limit)

	if err != nil {
		return nil, err
	}

	return res, err
}

func (p *Service) Get(ctx context.Context, id uuid.UUID) (models.Plan, error) {
	res, err := p.planRepo.Get(ctx, id)

	if err != nil {
		return res, err
	}

	return res, err
}

func (p *Service) Create(ctx context.Context, plan *models.Plan) error {
	err := p.planRepo.Create(ctx, plan)

	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func (p *Service) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := p.planRepo.Get(ctx, id)

	if err != nil {
		return nil
	}

	return p.planRepo.Delete(ctx, id)
}

func (p *Service) Update(ctx context.Context, id uuid.UUID, planInput *models.UpdatePlanInput) (*models.Plan, error) {
	plan, err := p.planRepo.Get(ctx, id)
	if err != nil {
		return nil, models.ErrNotFound
	}

	if planInput.Title != nil {
		plan.Title = *planInput.Title
	}

	if planInput.Icon != nil {
		plan.Icon = *planInput.Icon
	}

	err = p.planRepo.Update(ctx, &plan)
	if err != nil {
		return nil, err
	}

	return &plan, nil
}
