package controllers

import (
	"net/http"

	"family-book-challenge-backend/database"
	"family-book-challenge-backend/models"

	"github.com/gin-gonic/gin"
)

// Get all users
func GetUsers(c *gin.Context) {
	var users []models.User
	if err := database.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}
	c.JSON(http.StatusOK, users)
}

// Promote a user to admin
func PromoteToAdmin(c *gin.Context) {
	userID := c.Param("id")
	var user models.User
	if err := database.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	user.Role = "admin"
	database.DB.Save(&user)
	c.JSON(http.StatusOK, gin.H{"message": "User promoted to admin", "user": user})
}

// Delete a user
func DeleteUser(c *gin.Context) {
	userID := c.Param("id")
	if err := database.DB.Delete(&models.User{}, userID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
