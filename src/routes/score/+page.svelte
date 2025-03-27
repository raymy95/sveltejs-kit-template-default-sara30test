<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { auth } from '$lib/stores/auth';

    let rankings = [];
    let loading = true;
    let error = null;

    async function loadRankings() {
        try {
            // Get user rankings by total score
            const { data, error: rankingsError } = await supabase
                .from('users')
                .select(`
                    id,
                    username,
                    user_cards (score)
                `);

            if (rankingsError) throw rankingsError;

            // Calculate total score for each user and sort
            rankings = data
                .map(user => ({
                    id: user.id,
                    username: user.username,
                    totalScore: user.user_cards.reduce((sum, card) => sum + (card.score || 0), 0),
                    cardsUnlocked: user.user_cards.length
                }))
                .sort((a, b) => b.totalScore - a.totalScore) // Sort by score descending
                .map((user, index) => ({
                    ...user,
                    rank: index + 1
                }));

        } catch (e) {
            console.error('Error loading rankings:', e);
            error = 'Failed to load rankings';
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        auth.initialize();
        loadRankings();
    });
</script>

<svelte:head>
    <title>Classement - Card Collection</title>
    <meta name="description" content="User rankings" />
</svelte:head>

<div class="container">
    <h1>Classement</h1>

    {#if loading}
        <div class="loading">
            <p>Loading rankings...</p>
        </div>
    {:else if error}
        <div class="error">
            <p>{error}</p>
        </div>
    {:else if rankings.length === 0}
        <div class="no-data">
            <p>No rankings available yet.</p>
        </div>
    {:else}
        <div class="rankings">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Cards Unlocked</th>
                    </tr>
                </thead>
                <tbody>
                    {#each rankings as { rank, username, totalScore, cardsUnlocked, id }}
                        <tr class:current-user={id === $auth.userId}>
                            <td>{rank}</td>
                            <td>{username}</td>
                            <td>{totalScore}</td>
                            <td>{cardsUnlocked}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        text-align: center;
        margin-bottom: 2rem;
        color: var(--color-theme-1);
    }

    .rankings {
        background: white;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
    }

    th {
        font-weight: bold;
        color: var(--color-theme-2);
    }

    tr:last-child td {
        border-bottom: none;
    }

    .current-user {
        background-color: #fff3e0;
    }

    .loading, .error, .no-data {
        text-align: center;
        padding: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .error {
        color: #f44336;
    }

    @media (max-width: 600px) {
        .container {
            padding: 1rem;
        }

        th, td {
            padding: 0.5rem;
            font-size: 0.9rem;
        }
    }
</style>