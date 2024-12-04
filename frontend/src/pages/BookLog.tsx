import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Book as BookIcon } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { StarRating } from "../components/ui/StarRating";
import { useAuthStore } from "../store/useAuthStore";
import { bookSchema, type BookFormData } from "../lib/validations/book";
import axios from "axios";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

export function BookLog() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      completionDate: new Date().toISOString().split("T")[0],
    },
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const searchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/books/search`,
        {
          params: { q: searchQuery },
        }
      );

      const books = response.data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
      }));
      setSearchResults(books);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  // Handle book selection
  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setValue("title", book.title);
    setValue("author", book.authors.join(", "));
    setSearchResults([]); // Clear search results
  };

  const onSubmit = async (data: BookFormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:8080/api/booklogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id, // Assuming `user` contains the logged-in user's data
          title: data.title,
          author: data.author,
          completion_date: data.completionDate,
          rating: data.rating,
          review: data.review,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to log book");
      }

      const result = await response.json();
      alert("Book logged successfully!");
      navigate("/"); // Redirect to homepage or wherever appropriate
    } catch (error) {
      console.error("Error logging book:", error);
      alert("Failed to log book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <BookIcon className="mx-auto h-12 w-12 text-blue-600" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Log Your Book</h1>
        <p className="mt-2 text-gray-600">
          Search and log the book you've read to share your journey.
        </p>
      </div>

      {!selectedBook && (
        <div className="mb-6">
          <Input
            label="Search for a Book"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter book title or author"
          />
          <Button onClick={searchBooks} disabled={!searchQuery}>
            Search
          </Button>
          <div className="mt-4 space-y-4">
            {searchResults.map((book) => (
              <div
                key={book.id}
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => handleBookSelect(book)}
              >
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="h-12 w-12 rounded"
                />
                <div>
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600">
                    {book.authors.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedBook && (
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Book Title"
              {...register("title")}
              error={errors.title?.message}
              disabled
            />

            <Input
              label="Author"
              {...register("author")}
              error={errors.author?.message}
              disabled
            />

            <Input
              type="date"
              label="Completion Date"
              {...register("completionDate")}
              error={errors.completionDate?.message}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Rating
              </label>
              <Controller
                name="rating"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <StarRating
                    value={value || 0}
                    onChange={onChange}
                    disabled={isSubmitting}
                  />
                )}
              />
            </div>

            <Textarea
              label="Review (Optional)"
              {...register("review")}
              error={errors.review?.message}
              placeholder="Share your thoughts about the book..."
              rows={4}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedBook(null)}
                disabled={isSubmitting}
              >
                Back to Search
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging Book..." : "Log Book"}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
