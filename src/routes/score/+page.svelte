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

	.image-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		margin-top: 2rem;
	}

	.image-container {
		position: relative;
		width: 100%;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease-in-out;
	}

	.image-container:hover {
		transform: translateY(-5px);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
		color: var(--color-theme-1);
	}

	@media (max-width: 768px) {
		.image-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.container {
			padding: 1rem;
		}
	}
</style>