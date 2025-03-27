import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Initialize the auth store
const createAuthStore = () => {
    const { subscribe, set } = writable(false);

    return {
        subscribe,
        login: async (password) => {
            try {
                const response = await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password }),
                });
                
                const { isValid } = await response.json();
                
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