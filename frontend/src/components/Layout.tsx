import { BookOpen, LogOut, PlusCircle, Settings, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import React from "react";
import { useAuthStore } from "../store/useAuthStore";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: "Dashboard", href: "/", icon: BookOpen },
    { name: "Log Book", href: "/log-book", icon: PlusCircle },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    ...(user?.isAdmin
      ? [{ name: "Admin", href: "/admin", icon: Settings }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Family Book Challenge
                </span>
              </div>
              <div className="ml-6 flex space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                        location.pathname === item.href
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Welcome, {user.username}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="inline-flex items-center text-gray-500 hover:text-gray-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-gray-500 hover:text-gray-700">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
