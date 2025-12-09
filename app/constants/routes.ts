/**
 * Routes de l'application
 */

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  PROFILE_SETTINGS: '/profile/settings',
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.SETTINGS,
  ROUTES.PROFILE_SETTINGS,
] as const;
