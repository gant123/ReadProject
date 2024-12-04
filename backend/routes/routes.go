package routes

import (
	"family-book-challenge-backend/controllers"
	"family-book-challenge-backend/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")

	// Auth Routes
	api.POST("/register", controllers.Register)
	api.POST("/login", controllers.Login)
	controllers.SetJWTSecret(jwtSecret)

	// Protected Routes
	protected := api.Group("/")
	protected.Use(middlewares.AuthMiddleware())

	//Auth user
	protected.GET("/user", controllers.GetUser) // Validate user and fetch details
	// Book Routes
	api.GET("/books/search", controllers.SearchBooks)
	protected.GET("/books", controllers.GetBooks)
	protected.POST("/books", controllers.AddBook)
	protected.PUT("/books/:id", controllers.UpdateBook)
	protected.DELETE("/books/:id", controllers.DeleteBook)

	//Book Logged Routes
	protected.POST("/booklogs", controllers.AddBookLog)
	protected.GET("/booklogs", controllers.GetBookLogs)

	// Quiz Routes
	protected.GET("/quizzes/:bookId", controllers.GetQuizzes)
	protected.POST("/quizzes", controllers.CreateQuiz)
	protected.PUT("/quizzes/:id", controllers.UpdateQuiz)
	protected.DELETE("/quizzes/:id", controllers.DeleteQuiz)

	// User Routes
	protected.GET("/users", controllers.GetUsers)
	protected.PUT("/users/:id/promote", controllers.PromoteToAdmin)
	protected.DELETE("/users/:id", controllers.DeleteUser)
}
