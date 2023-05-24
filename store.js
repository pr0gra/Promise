import { create } from "zustand";
export const tokenStore = create((set) => ({
  token: null, // Изначальное значение токена - null
  setToken: (newToken) => set({ token: newToken }), // Функция для изменения токена
}));

export const goalStore = create((set) => ({
  goalId: null,
  setGoalId: (newId) => set({ goalId: newId }),
}));

// export const userInformationStore = create((set) => ({
//   bio: null,
//   city: null,
//   email: null,
//   firstName: null,
//   id: null,
//   lastName: null,
//   setBio: (newBio) => set({ bio: newBio }),
//   setCity: (newCity) => set({ city: newCity }),
//   setEmail: (newEmail) => set({ email: newEmail }),
//   setName: (newName) => set({ firstName: newName }),
//   setId: (newId) => set({ id: newId }),
//   setLastName: (newLastName) => set({ lastName: newLastName }),
// }));
export const userInformationStore = create((set) => ({
  userInformation: {
    bio: null,
    city: null,
    email: null,
    firstName: null,
    id: null,
    lastName: null,
  },
  setUserInformation: (newInformation) =>
    set({ userInformation: newInformation }),
}));
