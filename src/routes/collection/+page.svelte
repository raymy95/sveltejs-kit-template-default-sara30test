<script>
	const images = [
		{
			url: 'https://picsum.photos/400/300?random=1',
			alt: 'Random image 1'
		},
		{
			url: 'https://picsum.photos/400/300?random=2',
			alt: 'Random image 2'
		},
		{
			url: 'https://picsum.photos/400/300?random=3',
			alt: 'Random image 3'
		},
		{
			url: 'https://picsum.photos/400/300?random=4',
			alt: 'Random image 4'
		},
		{
			url: 'https://picsum.photos/400/300?random=5',
			alt: 'Random image 5'
		},
		{
			url: 'https://picsum.photos/400/300?random=6',
			alt: 'Random image 6'
		},
		{
			url: 'https://picsum.photos/400/300?random=7',
			alt: 'Random image 7'
		},
		{
			url: 'https://picsum.photos/400/300?random=8',
			alt: 'Random image 8'
		},
		{
			url: 'https://picsum.photos/400/300?random=9',
			alt: 'Random image 9'
		},
		{
			url: 'https://picsum.photos/400/300?random=10',
			alt: 'Random image 10'
		}
	];
</script>

<svelte:head>
	<title>Collection</title>
	<meta name="description" content="Your collection page" />
</svelte:head>

<div class="container">
	<h1>Collection</h1>
	
	<div class="image-grid">
		{#each images as image}
			<div class="image-container">
				<img src={image.url} alt={image.alt} loading="lazy" />
			</div>
		{/each}
	</div>
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