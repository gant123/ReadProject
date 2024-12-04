package controllers

import (
	"net/http"

	"family-book-challenge-backend/database"
	"family-book-challenge-backend/models"

	"github.com/gin-gonic/gin"
)

// Get quizzes for a book
func GetQuizzes(c *gin.Context) {
	bookID := c.Param("bookId")
	var quizzes []models.Quiz
	if err := database.DB.Where("book_id = ?", bookID).Find(&quizzes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch quizzes"})
		return
	}
	c.JSON(http.StatusOK, quizzes)
}

// Create a new quiz
func CreateQuiz(c *gin.Context) {
	var input models.Quiz
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create quiz"})
		return
	}

	c.JSON(http.StatusCreated, input)
}

// Update a quiz
func UpdateQuiz(c *gin.Context) {
	quizID := c.Param("id")
	var quiz models.Quiz
	if err := database.DB.First(&quiz, quizID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Quiz not found"})
		return
	}

	var input models.Quiz
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Model(&quiz).Updates(input)
	c.JSON(http.StatusOK, quiz)
}

// Delete a quiz
func DeleteQuiz(c *gin.Context) {
	quizID := c.Param("id")
	if err := database.DB.Delete(&models.Quiz{}, quizID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete quiz"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Quiz deleted successfully"})
}
