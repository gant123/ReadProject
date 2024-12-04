package controllers

import (
	"family-book-challenge-backend/database"
	"family-book-challenge-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// AddBookLog creates a new book log for a user
func AddBookLog(c *gin.Context) {
	var input struct {
		UserID         uint   `json:"user_id" binding:"required"`
		Title          string `json:"title" binding:"required"`
		Author         string `json:"author" binding:"required"`
		CompletionDate string `json:"completion_date" binding:"required"`
		Rating         int    `json:"rating"`
		Review         string `json:"review"`
	}

	// Validate request body
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create a new BookLog
	bookLog := models.BookLog{
		UserID:         input.UserID,
		Title:          input.Title,
		Author:         input.Author,
		CompletionDate: input.CompletionDate,
		Rating:         input.Rating,
		Review:         input.Review,
	}

	// Save to database
	if err := database.DB.Create(&bookLog).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save book log"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Book log created successfully", "data": bookLog})
}

// GetBookLogs retrieves all book logs for a specific user
func GetBookLogs(c *gin.Context) {
	userID := c.Query("user_id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	var bookLogs []models.BookLog
	if err := database.DB.Where("user_id = ?", userID).Find(&bookLogs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch book logs"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookLogs})
}
