<script>
	let {data} = $props();
</script>

<svelte:head>
	<title>Carte</title>
	<meta name="description" content="Carte" />
</svelte:head>

<div class="container">
	<h1>Carte</h1>
	<h1>{data.cardId}</h1>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
		color: var(--color-theme-1);
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}
	}
</style>