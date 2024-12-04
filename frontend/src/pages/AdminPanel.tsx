import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Users, BookOpen, HelpCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/useAuthStore';
import { QuizManager } from '../components/admin/QuizManager';
import { UserManager } from '../components/admin/UserManager';
import { BookManager } from '../components/admin/BookManager';

type AdminTab = 'users' | 'books' | 'quizzes';

export function AdminPanel() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }

  const tabs = [
    { id: 'users' as const, label: 'Users', icon: Users },
    { id: 'books' as const, label: 'Books', icon: BookOpen },
    { id: 'quizzes' as const, label: 'Quizzes', icon: HelpCircle },
  ];

  return (
    <div>
      <div className="mb-8 text-center">
        <Settings className="mx-auto h-12 w-12 text-blue-600" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Manage users, books, and quizzes
        </p>
      </div>

      <Card>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  flex items-center border-b-2 px-1 py-4 text-sm font-medium
                  ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }
                `}
              >
                <Icon className="mr-2 h-5 w-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'users' && <UserManager />}
          {activeTab === 'books' && <BookManager />}
          {activeTab === 'quizzes' && <QuizManager />}
        </div>
      </Card>
    </div>
  );
}