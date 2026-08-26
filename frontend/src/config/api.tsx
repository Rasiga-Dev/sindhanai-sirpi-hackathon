// src/config/api.tsx
// const VITE_BASE_URL = "http://localhost:11129/api";

const VITE_BASE_URL = import.meta.env.VITE_API_URL;
export default VITE_BASE_URL;