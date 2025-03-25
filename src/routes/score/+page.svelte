<script>
</script>

<svelte:head>
	<title>Classement</title>
	<meta name="description" content="Classement" />
</svelte:head>

<div class="container">
	<h1>Classement</h1>
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