package models

import "gorm.io/gorm"

// BookLog represents a log of a book read by a user
type BookLog struct {
	gorm.Model
	UserID         uint   `json:"user_id"`                   // References the user who logged the book
	Title          string `json:"title" binding:"required"`  // Book title
	Author         string `json:"author" binding:"required"` // Book author(s)
	CompletionDate string `json:"completion_date"`           // Date the book was completed
	Rating         int    `json:"rating"`                    // Rating given by the user (0–5)
	Review         string `json:"review"`                    // Optional user review
}
