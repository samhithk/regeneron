export const BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://regeneron-samhithk.vercel.app//api/v1"
    : "http://localhost:3000/api/v1";
