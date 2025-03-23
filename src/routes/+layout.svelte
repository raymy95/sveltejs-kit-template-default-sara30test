<script>
    import Header from './Header.svelte';
    import '../app.css';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    /** @type {{children: import('svelte').Snippet}} */
    let { children } = $props();

    // Initialize auth state
    onMount(() => {
        auth.initialize();
    });

    // Subscribe to auth state and redirect if not authenticated
    let isNotAuthenticated = $derived($page.url.pathname !== '/login' && !$auth);
    
    $effect(() => {
        if (isNotAuthenticated) {
            goto('/login');
        }
    });
</script>

<div class="app">
    {#if $auth || $page.url.pathname === '/login'}
        {#if $auth}
            <Header />
        {/if}

        <main>
            {@render children()}
        </main>

        <footer>
            <p>
                visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
            </p>
        </footer>
    {/if}
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
    }

    footer a {
        font-weight: bold;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>