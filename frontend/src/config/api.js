// frontend/src/config/api.js

// Always prefer the env variable. It should already include `/api`,
// e.g. https://flightv4-3.onrender.com/api
const envUrl = process.env.REACT_APP_BACKEND_URL;

/**
 * Single exported base URL for all API calls.
 * If the env var is missing for some reason, we fall back to a local backend.
 */
export const API_BASE_URL = envUrl || "http://localhost:8000/api";

console.log("[Flight Deck API CONFIG]", {
  envUrl,
  apiBaseUrl: API_BASE_URL,
});
