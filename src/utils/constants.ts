/**
 * Application-wide constants
 */

// Validation messages
export const VALIDATION_MESSAGES = {
  FIELD_REQUIRED: 'Field is required',
  INVALID_EMAIL: 'Invalid email format',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
} as const;

// Error display duration (in milliseconds)
export const ERROR_DISPLAY_DURATION = 3000;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
  },
  TODOS: '/todos',
  TASKS: '/tasks',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;
