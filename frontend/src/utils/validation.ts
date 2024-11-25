/** @format */

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Za-z]/.test(password)) {
    errors.push("Password must contain at least 1 letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least 1 number");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least 1 special character");
  }

  return errors;
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
