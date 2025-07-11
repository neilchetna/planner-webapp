package user

import (
	"context"
	"errors"

	userSDK "github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/neilchetna/planner-webapp/backend/models"
	"gorm.io/gorm"
)

type UserRepository interface {
	GetByClerkId(ctx context.Context, clerkId string) (*models.User, error)
	Create(ctx context.Context, user *models.User) error
}

type Service struct {
	userRepo UserRepository
}

func UserServiceBuilder(r UserRepository) *Service {
	return &Service{userRepo: r}
}

func (s *Service) SyncClerkUser(ctx context.Context, clerkId string) (*models.User, error) {
	user, err := s.userRepo.GetByClerkId(ctx, clerkId)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			clerkUser, err := userSDK.Get(ctx, clerkId)
			if err != nil {
				return nil, err
			}

			user = &models.User{
				Email:       clerkUser.EmailAddresses[0].EmailAddress,
				ClerkUserId: clerkId,
			}

			err = s.userRepo.Create(ctx, user)
			if err != nil {
				return nil, err
			}

		} else {
			return nil, err
		}
	}

	return user, nil
}
