<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';
    
    let username = '';
    let error = '';
    let initialized = false;

    $effect(() => {
        if (!initialized) {
            auth.initialize();
            initialized = true;
            
            // Check for admin mode in URL only once after initialization
            const isAdmin = $page.url.searchParams.get('admin') === 'true';
            if (isAdmin && !$auth.isAdmin) {
                handleAdminLogin();
            }
        }
    });

    async function handleAdminLogin() {
        try {
            await auth.login('Admin', true);
            goto(`/collection?token=${$page.url.searchParams.get('token')}&admin=true`);
        } catch (e) {
            console.error('Admin login error:', e);
            error = 'Échec de la connexion admin';
        }
    }

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
        <h1>Bienvenue à l'anniversaire de Sara 🎉</h1>
        {#if $auth.username}
            <div class="welcome-back">
                <h2>Connecté en tant que {$auth.username}</h2>
                <p>Prêt à collectionner des cartes ?</p>
                <button on:click={() => goto(`/collection?token=${$page.url.searchParams.get('token')}${$auth.isAdmin ? '&admin=true' : ''}`)}>
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
        width: 100%;
        min-height: calc(100vh - 8rem);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .login-box {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
        line-height: 1.2;
    }

    .welcome-back {
        margin: 2rem 0;
        text-align: center;
    }

    .welcome-back h2 {
        color: var(--color-theme-1);
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    .welcome-back p {
        margin-bottom: 1.5rem;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1.5rem 0;
    }

    input {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
        width: 100%;
    }

    input:focus {
        outline: none;
        border-color: var(--color-theme-1);
        box-shadow: 0 0 0 2px rgba(255, 62, 0, 0.1);
    }

    button {
        padding: 0.75rem 1.5rem;
        background: var(--color-theme-1);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        width: 100%;
        transition: background-color 0.2s, transform 0.1s;
    }

    button:hover {
        background: var(--color-theme-2);
    }

    button:active {
        transform: translateY(1px);
    }

    .error {
        color: #dc3545;
        margin-top: 1rem;
        text-align: center;
        font-size: 0.9rem;
    }

    @media (min-width: 480px) {
        .input-group {
            flex-direction: row;
        }

        input {
            flex: 1;
        }

        button {
            width: auto;
        }
    }

    @media (max-width: 480px) {
        .login-box {
            padding: 1.5rem;
        }

        h1 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .welcome-back h2 {
            font-size: 1.2rem;
        }
    }

    @media (max-width: 320px) {
        .login-box {
            padding: 1rem;
        }

        h1 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }

        input, button {
            padding: 0.5rem;
        }
    }
</style>