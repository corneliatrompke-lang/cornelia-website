/**
 * Runtime configuration helper.
 *
 * Values are read from window.env (injected by start.sh at container startup),
 * with a fallback to process.env for local development via Create React App.
 *
 * This allows the same built image to be deployed to any environment by simply
 * setting the REACT_APP_BACKEND_URL environment variable — no rebuild required.
 */
export const BACKEND_URL =
  (window.env && window.env.REACT_APP_BACKEND_URL) ||
  process.env.REACT_APP_BACKEND_URL ||
  "";
