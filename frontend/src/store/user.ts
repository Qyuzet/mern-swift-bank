import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
const useUserStore = create((set) => ({
  user: null, // Initially, no user is logged in
  error: null,

  // Action for login
  login: async (username, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          username: data.user.username,
          email: data.user.email,
          phone: data.user.phone,
          balance: data.user.balance,
          transactions: data.user.transactions,
          token: data.token,
        };
        // Persist token in localStorage
        localStorage.setItem("token", data.token);
        set({ user: userData, error: null });
        return { success: true };
      } else {
        set({ error: data.message });
        return { success: false, message: data.message };
      }
    } catch (err) {
      set({ error: "An error occurred during login." });
      return {
        success: false,
        message: `An error occurred during login: ${err.message}`,
      };
    }
  },

  // Action for signup
  signup: async (email, username, password, phone) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, phone }),
      });

      const data = await response.json();
      console.log("API response:", data); // Log the response for debugging

      if (response.ok) {
        if (data.user) {
          const userData = {
            username: data.user.username,
            email: data.user.email,
            phone: data.user.phone,
            token: data.token,
            balance: data.user.balance,
            transactions: data.user.transactions,
          };
          localStorage.setItem("token", data.token);
          set({ user: userData, error: null });
          return { success: true };
        } else {
          set({ error: "User data missing in response." });
          return { success: false, message: "User data missing in response." };
        }
      } else {
        set({ error: data.message });
        return { success: false, message: data.message };
      }
    } catch (err) {
      set({ error: "An error occurred during signup." });
      return {
        success: false,
        message: `An error occurred during signup: ${err.message}`,
      };
    }
  },

  // Action for logout
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, error: null });
  },

  // Load user from localStorage on app startup
  loadUserFromStorage: () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); // Use jwt-decode properly
      set({
        user: {
          token,
          username: decodedToken.username,
          email: decodedToken.email,
          phone: decodedToken.phone,
          balance: decodedToken.balance,
          transactions: decodedToken.transactions,
        },
      });
    }
  },
}));

export default useUserStore;
