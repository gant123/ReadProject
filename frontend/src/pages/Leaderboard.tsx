import React from 'react';
import { Trophy, Medal, BookOpen, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';

// Mock data for demonstration
const leaderboardData = [
  { id: '1', username: 'sarah.reader', booksRead: 15, points: 750, rank: 1 },
  { id: '2', username: 'bookworm_joe', booksRead: 12, points: 600, rank: 2 },
  { id: '3', username: 'emily.books', booksRead: 10, points: 500, rank: 3 },
  { id: '4', username: 'reading_master', booksRead: 8, points: 400, rank: 4 },
  { id: '5', username: 'page_turner', booksRead: 7, points: 350, rank: 5 },
];

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-400" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Medal className="h-6 w-6 text-amber-600" />;
    default:
      return <Award className="h-6 w-6 text-blue-400" />;
  }
}

export function Leaderboard() {
  return (
    <div>
      <div className="mb-8 text-center">
        <Trophy className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Reading Champions
        </h1>
        <p className="mt-2 text-gray-600">
          See who's leading the reading challenge
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top 3 Podium */}
        <Card className="md:col-span-2">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Top Readers</h2>
          <div className="flex flex-wrap items-end justify-center gap-4">
            {/* Second Place */}
            <div className="order-2 flex flex-col items-center">
              <div className="mb-2 rounded-full bg-gray-100 p-4">
                <Medal className="h-8 w-8 text-gray-400" />
              </div>
              <div className="h-32 w-24 rounded-t-lg bg-gray-200 p-4 text-center">
                <p className="font-semibold text-gray-900">
                  {leaderboardData[1].username}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {leaderboardData[1].points} pts
                </p>
              </div>
              <div className="w-full rounded-b-lg bg-gray-400 py-2 text-center text-white">
                2nd Place
              </div>
            </div>

            {/* First Place */}
            <div className="order-1 flex flex-col items-center">
              <div className="mb-2 rounded-full bg-yellow-100 p-4">
                <Trophy className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="h-40 w-24 rounded-t-lg bg-yellow-100 p-4 text-center">
                <p className="font-semibold text-gray-900">
                  {leaderboardData[0].username}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {leaderboardData[0].points} pts
                </p>
              </div>
              <div className="w-full rounded-b-lg bg-yellow-400 py-2 text-center text-white">
                1st Place
              </div>
            </div>

            {/* Third Place */}
            <div className="order-3 flex flex-col items-center">
              <div className="mb-2 rounded-full bg-amber-100 p-4">
                <Medal className="h-8 w-8 text-amber-600" />
              </div>
              <div className="h-24 w-24 rounded-t-lg bg-amber-100 p-4 text-center">
                <p className="font-semibold text-gray-900">
                  {leaderboardData[2].username}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {leaderboardData[2].points} pts
                </p>
              </div>
              <div className="w-full rounded-b-lg bg-amber-600 py-2 text-center text-white">
                3rd Place
              </div>
            </div>
          </div>
        </Card>

        {/* Reading Stats */}
        <Card>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Most Books Read
          </h2>
          <div className="space-y-4">
            {leaderboardData.slice(0, 3).map((reader) => (
              <div
                key={reader.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span className="font-medium text-gray-900">
                    {reader.username}
                  </span>
                </div>
                <span className="text-gray-600">{reader.booksRead} books</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Points Stats */}
        <Card>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Top Point Earners
          </h2>
          <div className="space-y-4">
            {leaderboardData.slice(0, 3).map((reader) => (
              <div
                key={reader.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-purple-500" />
                  <span className="font-medium text-gray-900">
                    {reader.username}
                  </span>
                </div>
                <span className="text-gray-600">{reader.points} points</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Full Rankings */}
        <Card className="md:col-span-2">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Complete Rankings
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Reader
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Books Read
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {leaderboardData.map((reader) => (
                  <tr key={reader.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        {getRankIcon(reader.rank)}
                        <span className="ml-2 font-medium text-gray-900">
                          #{reader.rank}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                      {reader.username}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                      {reader.booksRead}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                      {reader.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}