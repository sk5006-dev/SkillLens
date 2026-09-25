import { create } from "zustand";
import { authService, AuthResponse } from "../services/auth-service";
import { LoginInput, RegisterInput, ForgotPasswordInput, ResetPasswordInput } from "../validation/auth-schemas";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  forgotPassword: (data: ForgotPasswordInput) => Promise<void>;
  resetPassword: (data: ResetPasswordInput) => Promise<void>;
  clearError: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  error: null,

  login: async (data) => {
    set({ isLoading: true, error: null, isSuccess: false });
    try {
      const response = await authService.login(data);
      set({ 
        user: response.user, 
        isAuthenticated: true, 
        isLoading: false, 
        isSuccess: true 
      });
    } catch (err: any) {
      set({ 
        error: err.message || "An unexpected validation error occurred.", 
        isLoading: false, 
        isSuccess: false 
      });
      throw err;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null, isSuccess: false });
    try {
      const response = await authService.register(data);
      set({ 
        user: response.user, 
        isAuthenticated: true, 
        isLoading: false, 
        isSuccess: true 
      });
    } catch (err: any) {
      set({ 
        error: err.message || "An unexpected registration error occurred.", 
        isLoading: false, 
        isSuccess: false 
      });
      throw err;
    }
  },

  forgotPassword: async (data) => {
    set({ isLoading: true, error: null, isSuccess: false });
    try {
      await authService.forgotPassword(data);
      set({ isLoading: false, isSuccess: true });
    } catch (err: any) {
      set({ 
        error: err.message || "An unexpected recovery error occurred.", 
        isLoading: false, 
        isSuccess: false 
      });
      throw err;
    }
  },

  resetPassword: async (data) => {
    set({ isLoading: true, error: null, isSuccess: false });
    try {
      await authService.resetPassword(data);
      set({ isLoading: false, isSuccess: true });
    } catch (err: any) {
      set({ 
        error: err.message || "An unexpected reset error occurred.", 
        isLoading: false, 
        isSuccess: false 
      });
      throw err;
    }
  },

  clearError: () => set({ error: null, isSuccess: false }),

  logout: () => set({ user: null, isAuthenticated: false, isSuccess: false, error: null }),
}));
