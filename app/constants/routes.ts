/**
 * Routes de l'application
 */

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE_SETTINGS: '/profile/settings',
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE_SETTINGS,
] as const;
