"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { simpleHash } from "@/lib/affiliate";

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

interface UserState {
  currentUser: User | null;
  users: User[];

  register: (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => { success: boolean; error?: string };

  login: (email: string, password: string) => boolean;

  logout: () => void;

  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],

      register: (data) => {
        const state = get();

        // Validate username
        if (!data.username || data.username.trim().length === 0) {
          return { success: false, error: "errorUsernameRequired" };
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
          return { success: false, error: "errorEmailRequired" };
        }

        // Validate password length
        if (!data.password || data.password.length < 6) {
          return { success: false, error: "errorPasswordLength" };
        }

        // Validate passwords match
        if (data.password !== data.confirmPassword) {
          return { success: false, error: "errorPasswordMatch" };
        }

        // Check for duplicate email
        if (state.users.some((u) => u.email === data.email)) {
          return { success: false, error: "errorEmailExists" };
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          username: data.username.trim(),
          email: data.email.trim(),
          passwordHash: simpleHash(data.password),
          createdAt: new Date().toISOString(),
        };

        set({
          users: [...state.users, newUser],
          currentUser: newUser,
        });

        return { success: true };
      },

      login: (email: string, password: string) => {
        const state = get();
        const hash = simpleHash(password);
        const user = state.users.find(
          (u) => u.email === email && u.passwordHash === hash
        );
        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ currentUser: null });
      },

      isLoggedIn: () => {
        return get().currentUser !== null;
      },
    }),
    {
      name: "mv-users",
      partialize: (state) => ({
        currentUser: state.currentUser,
        users: state.users,
      }),
    }
  )
);
