import { create } from "zustand";
export const tokenStore = create((set) => ({
  token: null, // Изначальное значение токена - null
  setToken: (newToken) => set({ token: newToken }), // Функция для изменения токена
}));
