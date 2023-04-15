import { create } from "zustand";
export const useUserStore = create((set) => ({
  token:
    //   Временнно
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJwcm9taXNlIiwiZXhwIjoxNjgzOTgzNjYwLCJpYXQiOjE2ODE1NjQ0NjAsImlzcyI6InByb21pc2UiLCJqdGkiOiI1NWFkMDFjYS0yOGMyLTQyYTMtOGNiMi1hMzk1ZjFlOGMwZjQiLCJuYmYiOjE2ODE1NjQ0NTksInN1YiI6ImUwYTJkNzlhLWJiMDMtNGYzZi1iMjA4LWM4MmVkZmRhMWNjZSIsInR5cCI6InJlZnJlc2gifQ.lUVbK4EfB3EBTuXv5tRqEebviqpJGbvG-ZVkAfebv3dxWtOpozu0UpmaomgsyRL8ljrH1p5d5xRVW8B94lP7hw",
  setToken: (newToken) =>
    set((state) => {
      return { token: newToken };
    }),
}));
