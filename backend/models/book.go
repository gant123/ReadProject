package models

import "gorm.io/gorm"

type Book struct {
	gorm.Model
	Title       string `json:"title"`
	Author      string `json:"author"`
	Readers     int    `json:"readers"`
	AvgRating   float64 `json:"avg_rating"`
	Description string `json:"description"`
}
