import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const createAuthStore = () => {
    const { subscribe, set } = writable({ isAuthenticated: false, username: null });

    return {
        subscribe,
        login: async (username) => {
            if (browser) {
                localStorage.setItem('username', username);
                set({ isAuthenticated: true, username });
            }
        },
        logout: () => {
            if (browser) {
                localStorage.removeItem('username');
                set({ isAuthenticated: false, username: null });
            }
        },
        initialize: () => {
            if (browser) {
                const username = localStorage.getItem('username');
                if (username) {
                    set({ isAuthenticated: true, username });
                }
            }
        }
    };
};

export const auth = createAuthStore();