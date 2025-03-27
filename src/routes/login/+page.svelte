<script>
    import { auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';

    let password = '';
    let error = false;
    let loading = false;
    
    async function handleSubmit() {
        loading = true;
        error = false;
        
        try {
            const isValid = await auth.login(password);
            if (isValid) {
                goto('/');
            } else {
                error = true;
                password = '';
            }
        } catch (e) {
            error = true;
            console.error('Login error:', e);
        } finally {
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Login</title>
    <meta name="description" content="Login page" />
</svelte:head>

<div class="login-container">
    <div class="login-box">
        <h1>Login Required</h1>
        <form on:submit|preventDefault={handleSubmit}>
            <div class="input-group">
                <label for="password">Enter Password</label>
                <input
                    type="password"
                    id="password"
                    bind:value={password}
                    placeholder="Enter the daily password"
                    class:error
                    disabled={loading}
                />
            </div>
            {#if error}
                <p class="error-message">Invalid password. Please try again.</p>
            {/if}
            <button type="submit" disabled={loading}>
                {loading ? 'Checking...' : 'Login'}
            </button>
        </form>
    </div>
</div>

<style>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
    }

    .login-box {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
    }

    h1 {
        margin: 0 0 1.5rem 0;
        text-align: center;
        color: var(--color-theme-1);
    }

    .input-group {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--color-text);
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    input.error {
        border-color: red;
    }

    input:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }

    .error-message {
        color: red;
        margin: 0.5rem 0;
        font-size: 0.9rem;
    }

    button {
        width: 100%;
        padding: 0.75rem;
        background-color: var(--color-theme-1);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }

    button:not(:disabled):hover {
        background-color: var(--color-theme-2);
    }
</style>