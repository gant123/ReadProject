package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"unique;not null" json:"username"`
	Email    string `gorm:"unique;not null" json:"email"`
	Password string `json:"-"`
	Role     string `gorm:"default:'user'" json:"role"` // 'user' or 'admin'
}
