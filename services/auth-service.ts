import { LoginInput, RegisterInput, ForgotPasswordInput, ResetPasswordInput } from "../validation/auth-schemas";

export interface AuthResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

// Simulates network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(data: LoginInput): Promise<AuthResponse> {
    await delay(1200);

    // Mock validation constraints
    if (data.email === "error@skilllens.ai") {
      throw new Error("Unexpected database connection timeout.");
    }
    
    if (data.email !== "demo@skilllens.ai" || data.password !== "Demo123!") {
      throw new Error("Invalid email credentials or incorrect password.");
    }

    return {
      user: {
        name: "Pranav",
        email: data.email,
      },
      token: "mock-jwt-token-pranav-skilllens",
    };
  },

  async register(data: RegisterInput): Promise<AuthResponse> {
    await delay(1200);

    if (data.email === "exists@skilllens.ai") {
      throw new Error("An account with this email address already exists.");
    }

    return {
      user: {
        name: data.name,
        email: data.email,
      },
      token: "mock-jwt-token-registered-skilllens",
    };
  },

  async forgotPassword(data: ForgotPasswordInput): Promise<void> {
    await delay(1000);
    if (data.email === "unknown@skilllens.ai") {
      throw new Error("No active profile registered to this email.");
    }
  },

  async resetPassword(data: ResetPasswordInput): Promise<void> {
    await delay(1000);
  }
};
