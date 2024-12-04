package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"family-book-challenge-backend/database"
	"family-book-challenge-backend/models"
	"net/url"

	"github.com/gin-gonic/gin"
	"github.com/patrickmn/go-cache"
)

// Get all books
func GetBooks(c *gin.Context) {
	var books []models.Book
	if err := database.DB.Find(&books).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch books"})
		return
	}
	c.JSON(http.StatusOK, books)
}

// Add a new book
func AddBook(c *gin.Context) {
	var input models.Book
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add book"})
		return
	}

	c.JSON(http.StatusCreated, input)
}

// Update a book
func UpdateBook(c *gin.Context) {
	bookID := c.Param("id")
	var book models.Book
	if err := database.DB.First(&book, bookID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	var input models.Book
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Model(&book).Updates(input)
	c.JSON(http.StatusOK, book)
}

// Delete a book
func DeleteBook(c *gin.Context) {
	bookID := c.Param("id")
	if err := database.DB.Delete(&models.Book{}, bookID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete book"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Book deleted successfully"})
}

// Proxy request to Google Books API
var searchCache = cache.New(5*time.Minute, 10*time.Minute)

func SearchBooks(c *gin.Context) {
	query := c.Query("q") // Get the search query
	if query == "" {
		log.Println("Error: Missing query parameter 'q'")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Query parameter 'q' is required"})
		return
	}
	log.Printf("Received query: %s", query)

	// Check cache
	if cachedResult, found := searchCache.Get(query); found {
		log.Printf("Cache hit for query: %s", query)
		c.JSON(http.StatusOK, cachedResult)
		return
	}
	log.Printf("Cache miss for query: %s", query)

	apiKey := os.Getenv("GOOGLE_API_KEY")
	if apiKey == "" {
		log.Println("Error: GOOGLE_API_KEY environment variable is not set")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "API key not configured"})
		return
	}
	log.Println("API key successfully retrieved")

	url := fmt.Sprintf("https://www.googleapis.com/books/v1/volumes?q=%s&key=%s", url.QueryEscape(query), apiKey)

	log.Printf("Requesting Google Books API: %s", url)

	// Make API request
	resp, err := http.Get(url)
	if err != nil {
		log.Printf("Error making request to Google Books API: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to Google Books API"})
		return
	}
	defer resp.Body.Close()

	log.Printf("Google Books API responded with status: %d", resp.StatusCode)
	if resp.StatusCode != http.StatusOK {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Google Books API error", "status": resp.Status})
		return
	}

	// Decode response
	var rawResult interface{}
	err = json.NewDecoder(resp.Body).Decode(&rawResult)
	if err != nil {
		log.Printf("Error decoding API response: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse API response"})
		return
	}
	log.Printf("API response successfully decoded")

	// Cache result and return
	searchCache.Set(query, rawResult, cache.DefaultExpiration)
	log.Printf("Query '%s' processed and cached successfully", query)
	c.JSON(http.StatusOK, rawResult)
}
