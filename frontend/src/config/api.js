// Centralized API configuration
// Automatically detects localhost and uses appropriate backend URL

const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
   window.location.hostname === "127.0.0.1");

const LOCAL_API_BASE_URL = "http://localhost:8000/api";

// Production URL from Replit deployment
const PROD_API_BASE_URL = "https://a97b25a4-2ac7-467b-821e-39acdb1ba4f0-00-2s4inz659trpr.kirk.replit.dev:8000/api";

// Use env variable if provided, otherwise auto-detect based on hostname
const envBackendUrl = process.env.REACT_APP_BACKEND_URL;

export const API_BASE_URL = envBackendUrl
  ? `${envBackendUrl}/api`
  : isLocalhost
  ? LOCAL_API_BASE_URL
  : PROD_API_BASE_URL;

// For debugging - you can remove this later
console.log('API Config:', {
  hostname: typeof window !== "undefined" ? window.location.hostname : 'SSR',
  isLocalhost,
  apiBaseUrl: API_BASE_URL
});
