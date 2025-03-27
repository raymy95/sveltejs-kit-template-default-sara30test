<script>
    import { auth } from '$lib/stores/auth';
    
    let username = '';
    let error = '';

    async function handleLogin() {
        if (!username.trim()) {
            error = 'Please enter a username';
            return;
        }
        
        try {
            await auth.login(username);
            error = '';
        } catch (e) {
            error = 'Login failed';
        }
    }
</script>

<svelte:head>
    <title>Card Collection Game</title>
    <meta name="description" content="Card collection game" />
</svelte:head>

<div class="container">
    {#if !$auth.isAuthenticated}
        <div class="login-box">
            <h1>Welcome to Card Collection</h1>
            <div class="input-group">
                <input
                    type="text"
                    bind:value={username}
                    placeholder="Enter your username"
                    on:keydown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <button on:click={handleLogin}>Start Playing</button>
            </div>
            {#if error}
                <p class="error">{error}</p>
            {/if}
        </div>
    {:else}
        <h1>Welcome back, {$auth.username}!</h1>
        <p>Visit the collection page to view and unlock your cards.</p>
    {/if}
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
    }

    .login-box {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .input-group {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        justify-content: center;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        background: var(--color-theme-1);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background: var(--color-theme-2);
    }

    .error {
        color: red;
        margin-top: 1rem;
    }
</style>