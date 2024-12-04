package database

import (
	"family-book-challenge-backend/models"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	var err error
	DB, err = gorm.Open(sqlite.Open("familyBookChallenge.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connection established.")

	// AutoMigrate the models
	err = DB.AutoMigrate(&models.User{}, &models.Book{}, &models.Quiz{}, &models.UserQuiz{}, &models.BookLog{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	log.Println("Database migration completed.")
}
