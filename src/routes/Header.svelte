<script>
    import { page } from '$app/stores';
    import logo from '$lib/images/svelte-logo.svg';
    import github from '$lib/images/github.svg';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';
    
    $effect(() => {
        auth.initialize();
    });

    function handleNavigation(path) {
        goto(`${path}?token=${$page.url.searchParams.get('token')}`);
    }

    function handleLogout() {
        auth.logout();
        handleNavigation('/');
    }
</script>

<header>
    <div class="corner">
        <a href="https://svelte.dev/docs/kit">
            <img src={logo} alt="SvelteKit" />
        </a>
    </div>

    <nav>
        <svg viewBox="0 0 2 3" aria-hidden="true">
            <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
        </svg>
        <ul>
            <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
                <button on:click={() => handleNavigation('/')}>Home</button>
            </li>
            <li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
                <button on:click={() => handleNavigation('/about')}>About</button>
            </li>
            <li aria-current={$page.url.pathname === '/collection' ? 'page' : undefined}>
                <button on:click={() => handleNavigation('/collection')}>Collection</button>
            </li>
            <li aria-current={$page.url.pathname === '/score' ? 'page' : undefined}>
                <button on:click={() => handleNavigation('/score')}>Classement</button>
            </li>
            {#if $auth.username}
                <li class="username">
                    <span>Welcome, {$auth.username}!</span>
                </li>
                <li>
                    <button class="logout-button" on:click={handleLogout}>Logout</button>
                </li>
            {/if}
        </ul>
        <svg viewBox="0 0 2 3" aria-hidden="true">
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
    }

    .corner {
        width: 3em;
        height: 3em;
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
    }

    svg {
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
</style>