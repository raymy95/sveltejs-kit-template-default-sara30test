<script>
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>Accès Refusé</title>
</svelte:head>

<div class="error-container">
    <h1>Accès Refusé</h1>
    <p>Vous avez besoin d'un jeton valide pour accéder à ce site.</p>
    <p>Veuillez ajouter un jeton valide à l'URL : <code>?token=xxx</code></p>
</div>

<style>
    .error-container {
        max-width: 600px;
        margin: 4rem auto;
        padding: 2rem;
        text-align: center;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1 {
        color: #ff3e00;
        margin-bottom: 1rem;
    }

    p {
        margin: 1rem 0;
        line-height: 1.5;
    }

    code {
        background: #f5f5f5;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-family: monospace;
    }
</style>