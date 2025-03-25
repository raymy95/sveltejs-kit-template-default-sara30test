import { w as writable } from "./exports.js";
import { b as browser } from "./index4.js";
const createAuthStore = () => {
  const { subscribe, set } = writable(false);
  return {
    subscribe,
    login: async (password) => {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ password })
        });
        const { isValid } = await response.json();
        if (isValid && browser) ;
        return isValid;
      } catch (error) {
        console.error("Authentication error:", error);
        return false;
      }
    },
    logout: () => {
    },
    initialize: () => {
    }
  };
};
const auth = createAuthStore();
export {
  auth as a
};
