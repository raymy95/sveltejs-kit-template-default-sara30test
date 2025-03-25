import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Initialize the auth store
const createAuthStore = () => {
    const { subscribe, set } = writable(false);

    return {
        subscribe,
        login: async (password) => {
            try {
                // Instead of making an API call, we'll handle the auth directly
                const isValid = password === "remyremy";
                
                if (isValid && browser) {
                    localStorage.setItem('auth', 'true');
                    set(true);
                }
                return isValid;
            } catch (error) {
                console.error('Authentication error:', error);
                return false;
            }
        },
        logout: () => {
            if (browser) {
                localStorage.removeItem('auth');
                set(false);
            }
        },
        initialize: () => {
            if (browser) {
                const isAuthenticated = localStorage.getItem('auth') === 'true';
                set(isAuthenticated);
            }
        }
    };
};

export const auth = createAuthStore();