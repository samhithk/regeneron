export const BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://main.d3d7fus2gizt14.amplifyapp.com/api/v1"
    : "http://localhost:3000/api/v1";
