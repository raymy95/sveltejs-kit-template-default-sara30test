<script>
    import { page } from '$app/stores';
    import logo from '$lib/images/svelte-logo.svg';
    import github from '$lib/images/github.svg';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';
    
    let menuOpen = $state(false);
    
    $effect(() => {
        auth.initialize();
    });

    function handleNavigation(path) {
        goto(`${path}?token=${$page.url.searchParams.get('token')}`);
        menuOpen = false;
    }

    function handleLogout() {
        auth.logout();
        handleNavigation('/');
    }

    function toggleMenu() {
        menuOpen = !menuOpen;
    }
</script>

<header>
    <div class="corner">
        <a href="https://svelte.dev/docs/kit">
            <img src={logo} alt="SvelteKit" />
        </a>
    </div>

    <button class="menu-button" on:click={toggleMenu} aria-label="Ouvrir le menu">
        <div class="hamburger" class:open={menuOpen}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </button>

    <nav class:open={menuOpen}>
        <svg viewBox="0 0 2 3" aria-hidden="true" class="nav-arrow">
            <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
        </svg>
        <ul>
            <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
                <button on:click={() => handleNavigation('/')}>Accueil</button>
            </li>
            <li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
                <button on:click={() => handleNavigation('/about')}>À propos</button>
            </li>
            <li aria-current={$page.url.pathname === '/collection' ? 'page' : undefined}>
                <button on:click={() => handleNavigation('/collection')}>Collection</button>
            </li>
            <li aria-current={$page.url.pathname === '/score' ? 'page' : undefined}>
                <button on:click={() => handleNavigation('/score')}>Classement</button>
            </li>
            {#if $auth.username}
                <li class="username">
                    <span>Bienvenue, {$auth.username}!</span>
                </li>
                <li>
                    <button class="logout-button" on:click={handleLogout}>Déconnexion</button>
                </li>
            {/if}
        </ul>
        <svg viewBox="0 0 2 3" aria-hidden="true" class="nav-arrow">
            <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
        </svg>
    </nav>

    <div class="corner">
        <a href="https://github.com/sveltejs/kit">
            <img src={github} alt="GitHub" />
        </a>
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        position: relative;
    }

    .corner {
        width: 3em;
        height: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .corner a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .corner img {
        width: 2em;
        height: 2em;
        object-fit: contain;
    }

    nav {
        display: flex;
        justify-content: center;
        --background: rgba(255, 255, 255, 0.7);
        position: relative;
    }

    .nav-arrow {
        width: 2em;
        height: 3em;
        display: block;
    }

    path {
        fill: var(--background);
    }

    ul {
        position: relative;
        padding: 0;
        margin: 0;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        background: var(--background);
        background-size: contain;
    }

    li {
        position: relative;
        height: 100%;
    }

    li[aria-current='page']::before {
        --size: 6px;
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: calc(50% - var(--size));
        border: var(--size) solid transparent;
        border-top: var(--size) solid var(--color-theme-1);
    }

    button {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0 0.5rem;
        color: var(--color-text);
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: color 0.2s linear;
        border: none;
        background: none;
        cursor: pointer;
    }

    button:hover {
        color: var(--color-theme-1);
    }

    .username {
        display: flex;
        align-items: center;
        padding: 0 1rem;
        color: var(--color-theme-1);
        font-weight: 700;
    }

    .logout-button {
        color: var(--color-theme-1);
    }

    .logout-button:hover {
        color: #ff0000;
    }

    .menu-button {
        display: none;
        padding: 1rem;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 100;
    }

    .hamburger {
        width: 24px;
        height: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .hamburger span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: var(--color-text);
        transition: all 0.3s ease-in-out;
    }

    .hamburger.open span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }

    .hamburger.open span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.open span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }

    @media (max-width: 768px) {
        .menu-button {
            display: block;
        }

        nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.95);
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            z-index: 90;
            padding: 4rem 1rem 1rem;
        }

        nav.open {
            transform: translateX(0);
        }

        .nav-arrow {
            display: none;
        }

        ul {
            flex-direction: column;
            height: auto;
            background: none;
            gap: 1rem;
        }

        li {
            height: auto;
            width: 100%;
        }

        button {
            width: 100%;
            justify-content: center;
            padding: 1rem;
        }

        li[aria-current='page']::before {
            display: none;
        }

        .username {
            text-align: center;
            padding: 1rem;
        }

        .corner:last-child {
            display: none;
        }
    }

    @media (max-width: 480px) {
        .corner:first-child {
            display: none;
        }
    }
</style>