import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { supabase } from '$lib/supabase';

const createAuthStore = () => {
    const { subscribe, set } = writable({ isAuthenticated: false, username: null, userId: null });

    return {
        subscribe,
        login: async (username) => {
            try {
                // Check if user exists
                let { data: existingUser, error: selectError } = await supabase
                    .from('users')
                    .select('id, username')
                    .eq('username', username);

                if (selectError) throw selectError;

                let user;
                
                if (!existingUser || existingUser.length === 0) {
                    // Create new user
                    const { data: newUser, error: insertError } = await supabase
                        .from('users')
                        .insert([{ username }])
                        .select()
                        .single();

                    if (insertError) throw insertError;
                    user = newUser;
                } else {
                    user = existingUser[0];
                }

                if (browser) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('userId', user.id);
                    set({ isAuthenticated: true, username, userId: user.id });
                }

                return user;
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },
        logout: () => {
            if (browser) {
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                set({ isAuthenticated: false, username: null, userId: null });
            }
        },
        initialize: () => {
            if (browser) {
                const username = localStorage.getItem('username');
                const userId = localStorage.getItem('userId');
                if (username && userId) {
                    set({ isAuthenticated: true, username, userId });
                }
            }
        }
    };
};

export const auth = createAuthStore();