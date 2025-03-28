<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';
    
    let username = '';
    let error = '';

    $effect(() => {
        auth.initialize();
    });

    async function handleLogin() {
        if (!username.trim()) {
            error = 'Veuillez entrer un nom d\'utilisateur';
            return;
        }
        
        try {
            await auth.login(username);
            goto(`/collection?token=${$page.url.searchParams.get('token')}`);
        } catch (e) {
            console.error('Login error:', e);
            error = 'Échec de la connexion';
        }
    }
</script>

<svelte:head>
    <title>Jeu de Collection de Cartes</title>
    <meta name="description" content="Jeu de collection de cartes" />
</svelte:head>

<div class="container">
    <div class="login-box">
        <h1>Bienvenue dans Collection de Cartes</h1>
        {#if $auth.username}
            <div class="welcome-back">
                <h2>Bon retour, {$auth.username}!</h2>
                <p>Prêt à continuer votre collection ?</p>
                <button on:click={() => goto(`/collection?token=${$page.url.searchParams.get('token')}`)}>
                    Voir ma Collection
                </button>
            </div>
        {:else}
            <div class="input-group">
                <input
                    type="text"
                    bind:value={username}
                    placeholder="Entrez votre nom d'utilisateur"
                    on:keydown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <button on:click={handleLogin}>Commencer à Jouer</button>
            </div>
            {#if error}
                <p class="error">{error}</p>
            {/if}
        {/if}
    </div>
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

    .welcome-back {
        margin: 2rem 0;
    }

    .welcome-back h2 {
        color: var(--color-theme-1);
        margin-bottom: 1rem;
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