import { w as writable } from "./index2.js";
import { b as browser } from "./index4.js";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://saeibrcpuwoxhfsrypzh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhZWlicmNwdXdveGhmc3J5cHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDM3NjAsImV4cCI6MjA1ODY3OTc2MH0.h56P92cb8doCUJKx2CjZFE3hjC_HakNyDM28g4AbRZE"
);
const createAuthStore = () => {
  const { subscribe, set, update } = writable({
    isAuthenticated: false,
    username: null,
    userId: null
  });
  return {
    subscribe,
    login: async (username) => {
      try {
        let { data: existingUser, error: selectError } = await supabase.from("users").select("id, username").eq("username", username).single();
        if (selectError && selectError.code !== "PGRST116") throw selectError;
        let user;
        if (!existingUser) {
          const { data: newUser, error: insertError } = await supabase.from("users").insert({ username }).select().single();
          if (insertError) throw insertError;
          user = newUser;
        } else {
          user = existingUser;
        }
        const authState = {
          isAuthenticated: true,
          username: user.username,
          userId: user.id
        };
        if (browser) ;
        set(authState);
        return user;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    logout: () => {
      const authState = {
        isAuthenticated: false,
        username: null,
        userId: null
      };
      set(authState);
    },
    initialize: () => {
    }
  };
};
const auth = createAuthStore();
export {
  auth as a
};
