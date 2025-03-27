import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { supabase } from '$lib/supabase';

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
                // Check if user exists
                let { data: existingUser, error: selectError } = await supabase
                    .from('users')
                    .select('id, username')
                    .eq('username', username)
                    .single();

                if (selectError && selectError.code !== 'PGRST116') throw selectError;

                let user;
                
                if (!existingUser) {
                    // Create new user
                    const { data: newUser, error: insertError } = await supabase
                        .from('users')
                        .insert({ username })
                        .select()
                        .single();

                    if (insertError) throw insertError;
                    user = newUser;
                } else {
                    user = existingUser;
                }

                // Set auth state
                const authState = { 
                    isAuthenticated: true, 
                    username: user.username, 
                    userId: user.id 
                };

                if (browser) {
                    localStorage.setItem('authState', JSON.stringify(authState));
                }

                set(authState);
                return user;
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },
        logout: () => {
            const authState = { 
                isAuthenticated: false, 
                username: null, 
                userId: null 
            };

            if (browser) {
                localStorage.removeItem('authState');
            }

            set(authState);
        },
        initialize: () => {
            if (browser) {
                const storedAuth = localStorage.getItem('authState');
                if (storedAuth) {
                    try {
                        const authState = JSON.parse(storedAuth);
                        set(authState);
                    } catch (e) {
                        console.error('Failed to parse stored auth state:', e);
                        localStorage.removeItem('authState');
                    }
                }
            }
        }
    };
};

export const auth = createAuthStore();