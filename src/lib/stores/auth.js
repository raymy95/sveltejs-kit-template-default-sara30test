import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const createAuthStore = () => {
    const { subscribe, set } = writable(false);

    return {
        subscribe,
        validateToken: (token) => {
            const isValid = token === "remyremy"; // Using the same token as before
            if (isValid && browser) {
                localStorage.setItem('auth', 'true');
                set(true);
            }
            return isValid;
        },
        logout: () => {
            if (browser) {
                localStorage.removeItem('auth');
                set(false);
            }
        },
        initialize: (token) => {
            if (browser) {
                const isAuthenticated = token === "remyremy";
                set(isAuthenticated);
                if (isAuthenticated) {
                    localStorage.setItem('auth', 'true');
                }
            }
        }
    };
};

export const auth = createAuthStore();