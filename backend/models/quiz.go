package models

import "gorm.io/gorm"

type Quiz struct {
	gorm.Model
	BookID        uint   `json:"book_id"`
	Question      string `json:"question"`
	OptionA       string `json:"option_a"`
	OptionB       string `json:"option_b"`
	OptionC       string `json:"option_c"`
	OptionD       string `json:"option_d"`
	CorrectOption string `json:"correct_option"`
}
