package models

import "gorm.io/gorm"

type UserQuiz struct {
	gorm.Model
	UserID uint `json:"user_id"`
	QuizID uint `json:"quiz_id"`
	Score  int  `json:"score"`
}
