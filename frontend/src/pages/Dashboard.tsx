import { Award, PlusCircle, Star } from "lucide-react";

import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";

export function Dashboard() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to Family Book Challenge
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Please log in to track your reading progress
        </p>
        <Link to="/login">
          <Button className="mt-6">Login to Get Started</Button>
        </Link>
      </div>
    );
  }

  const progress = (user.booksRead / 12) * 100;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Your Reading Journey</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <PlusCircle className="h-8 w-8 text-blue-500" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">
              Books Read
            </h2>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            {user.booksRead}
          </p>
          <p className="mt-1 text-sm text-gray-500">out of 12 books goal</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-500" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">
              Points Earned
            </h2>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">{user.points}</p>
          <p className="mt-1 text-sm text-gray-500">total challenge points</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-purple-500" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">
              Prize Entries
            </h2>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            {Math.floor(user.points / 100)}
          </p>
          <p className="mt-1 text-sm text-gray-500">drawing entries earned</p>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          Reading Progress
        </h2>
        <div className="mt-4">
          <div className="relative h-4 w-full rounded-full bg-gray-200">
            <div
              className="absolute h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {progress.toFixed(0)}% complete
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link to="/log-book">
          <Button size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Log a New Book
          </Button>
        </Link>
      </div>
    </div>
  );
}
