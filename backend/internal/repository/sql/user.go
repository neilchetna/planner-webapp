package sqlrepository

import (
	"context"

	"github.com/neilchetna/planner-webapp/backend/models"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func UserRepositoryBuilder(db *gorm.DB) *UserRepository {
	return &UserRepository{db}
}

func (r *UserRepository) GetByClerkId(ctx context.Context, clerkId string) (*models.User, error) {
	var user models.User
	res := r.db.WithContext(ctx).First(&user, "clerk_user_id = ?", clerkId)

	if res.Error != nil {
		return nil, res.Error
	}

	return &user, nil
}

func (r *UserRepository) Create(ctx context.Context, user *models.User) error {
	res := r.db.WithContext(ctx).Create(&user)

	if res.Error != nil {
		return res.Error
	}

	return nil
}
