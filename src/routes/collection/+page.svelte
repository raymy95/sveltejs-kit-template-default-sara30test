<script>
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { goto } from '$app/navigation';
    
    let cards = [];
    let unlockedCards = new Set();
    let selectedCard = null;
    let password = '';
    let error = '';
    let showUnlockModal = false;
    let loading = true;

    // Default locked card image
    const lockedCardImage = "https://picsum.photos/400/300?blur=10";

    onMount(async () => {
        if (!$auth.isAuthenticated || !$auth.userId) {
            goto('/');
            return;
        }

        try {
            // Load all cards
            const { data: allCards, error: cardsError } = await supabase
                .from('cards')
                .select('*');
            
            if (cardsError) throw cardsError;
            
            if (allCards) {
                cards = allCards;
            }

            // Load user's unlocked cards
            if ($auth.userId) {
                const { data: userCards, error: userCardsError } = await supabase
                    .from('user_cards')
                    .select('card_id')
                    .eq('user_id', $auth.userId);
                
                if (userCardsError) throw userCardsError;
                
                if (userCards) {
                    unlockedCards = new Set(userCards.map(uc => uc.card_id));
                }
            }
        } catch (e) {
            console.error('Error loading cards:', e);
            error = 'Failed to load cards';
        } finally {
            loading = false;
        }
    });

    function openUnlockModal(card) {
        selectedCard = card;
        password = '';
        error = '';
        showUnlockModal = true;
    }

    async function tryUnlock() {
        if (!$auth.userId) {
            error = 'Please log in first';
            return;
        }

        try {
            if (selectedCard.unlock_password !== password) {
                error = 'Incorrect password';
                return;
            }

            const { error: unlockError } = await supabase
                .from('user_cards')
                .insert([{
                    user_id: $auth.userId,
                    card_id: selectedCard.id
                }]);

            if (unlockError) throw unlockError;

            unlockedCards.add(selectedCard.id);
            unlockedCards = unlockedCards; // trigger reactivity
            showUnlockModal = false;
        } catch (e) {
            error = 'Failed to unlock card';
            console.error('Unlock error:', e);
        }
    }
</script>

<div class="container">
    <h1>Your Card Collection</h1>
    
    {#if loading}
        <p>Loading cards...</p>
    {:else if error}
        <p class="error">{error}</p>
    {:else}
        <div class="cards-grid">
            {#each cards as card}
                <div class="card {unlockedCards.has(card.id) ? 'unlocked' : 'locked'}"
                     on:click={() => !unlockedCards.has(card.id) && openUnlockModal(card)}>
                    <img src={unlockedCards.has(card.id) ? card.image_url : lockedCardImage} 
                         alt={unlockedCards.has(card.id) ? card.name : 'Locked card'} />
                    <div class="card-info">
                        <h3>{unlockedCards.has(card.id) ? card.name : '???'}</h3>
                        {#if unlockedCards.has(card.id)}
                            <p>{card.description}</p>
                            <span class="rarity">{card.rarity}</span>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    {/if}

    {#if showUnlockModal}
        <div class="modal-overlay">
            <div class="modal">
                <h2>Unlock Card</h2>
                <p>Enter the password to unlock this card:</p>
                <input
                    type="password"
                    bind:value={password}
                    placeholder="Enter password"
                    on:keydown={(e) => e.key === 'Enter' && tryUnlock()}
                />
                {#if error}
                    <p class="error">{error}</p>
                {/if}
                <div class="modal-buttons">
                    <button on:click={tryUnlock}>Unlock</button>
                    <button class="cancel" on:click={() => showUnlockModal = false}>Cancel</button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        cursor: pointer;
    }

    .card:hover {
        transform: translateY(-5px);
    }

    .card.locked {
        filter: grayscale(1);
    }

    .card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .card-info {
        padding: 1rem;
    }

    .rarity {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        background: var(--color-theme-1);
        color: white;
        border-radius: 4px;
        font-size: 0.8rem;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
    }

    .modal input {
        width: 100%;
        padding: 0.5rem;
        margin: 1rem 0;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .modal-buttons {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background: var(--color-theme-1);
        color: white;
    }

    button.cancel {
        background: #ccc;
    }

    .error {
        color: red;
        margin-top: 0.5rem;
    }
</style>