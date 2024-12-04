import React from 'react';
import { HelpCircle, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

const mockQuizzes = [
  {
    id: '1',
    bookTitle: 'The Great Gatsby',
    questionCount: 10,
    avgScore: 85,
    completions: 5,
  },
  {
    id: '2',
    bookTitle: '1984',
    questionCount: 8,
    avgScore: 78,
    completions: 3,
  },
  {
    id: '3',
    bookTitle: 'Pride and Prejudice',
    questionCount: 12,
    avgScore: 92,
    completions: 4,
  },
];

export function QuizManager() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Quiz Management</h2>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Quiz
        </Button>
      </div>

      <div className="grid gap-4">
        {mockQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <HelpCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {quiz.bookTitle}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {quiz.questionCount} questions
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">
                  Average Score
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {quiz.avgScore}%
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">
                  Completions
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {quiz.completions}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View Questions
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}