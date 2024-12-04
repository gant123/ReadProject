export interface User {
  id: string;
  username: string;
  email: string;
  booksRead: number;
  points: number;
  isAdmin: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  completionDate: string;
  rating?: number;
  review?: string;
  userId: string;
  quizCompleted: boolean;
  quizScore?: number;
}

export interface Quiz {
  id: string;
  bookId: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface DecodedToken {
  exp: number; // Expiration time in seconds since the epoch
  [key: string]: unknown; // Other fields in the token
}
