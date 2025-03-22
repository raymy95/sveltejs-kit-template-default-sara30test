<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import { page } from '$app/stores';

	import { onMount } from 'svelte';

    let url = ``;

    onMount(() => url = window.location.href);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<!-- <source srcset={welcome} type="image/webp" /> -->
				<img src={"lib/images/svelte-welcome.png"}  alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app

		<p>Current URL: {$page.path}</p>

		<p>Current URL: {url}</p>

		<img src="https://chwtgvxmvxswmkpttqoz.supabase.co/storage/v1/object/sign/images/476617091_1667970033814757_8381891033472949217_n-Photoroom.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvNDc2NjE3MDkxXzE2Njc5NzAwMzM4MTQ3NTdfODM4MTg5MTAzMzQ3Mjk0OTIxN19uLVBob3Rvcm9vbS5wbmciLCJpYXQiOjE3NDI2NDE5NzgsImV4cCI6MTc0MzI0Njc3OH0.qFAv1qeeuX3IM4asObAxMKQGy-gzF3V27BCCTPpitec"   />

		
		
		
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
