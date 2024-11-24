/** @format */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import Button from "components/Button";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-600">
                We're glad to see you again on your dashboard.
              </p>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </span>
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Quick Start
              </h3>
              <p className="text-blue-700">
                Get started with our platform features.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Recent Activity
              </h3>
              <p className="text-purple-700">
                View your latest actions and updates.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Resources
              </h3>
              <p className="text-green-700">
                Access helpful guides and documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
