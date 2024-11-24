/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "components/Input";
import Button from "components/Button";
import { useAuth } from "contexts/AuthContext";
import { authApi } from "api/auth";
import { validatePassword, validateEmail } from "utils/validation";

export default function SignUp() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors[0];
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      const response = await authApi.signUp(formData);
      setAuth(response.user, response.token);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ submit: "Failed to create account" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome to Easygenerator!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create an account to get started
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
              autoComplete="name"
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email}
              autoComplete="email"
            />
            <div>
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={errors.password}
                autoComplete="new-password"
              />
              <p className="mt-1 text-sm text-gray-500">
                Password must be at least 8 characters long with numbers and
                letters
              </p>
            </div>
          </div>

          {errors.submit && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          )}

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700"
          >
            Create Account
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
