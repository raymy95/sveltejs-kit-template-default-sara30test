<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabase';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    
    let cards = [];
    let unlockedCards = new Set();
    let selectedCard = null;
    let password = '';
    let modalError = '';
    let pageError = '';
    let showUnlockModal = false;
    let loading = true;

    const lockedCardImage = "https://picsum.photos/400/300?blur=10";

    onMount(async () => {
        try {
            auth.initialize();

            const { data: allCards, error: cardsError } = await supabase
                .from('cards')
                .select('*');
            
            if (cardsError) throw cardsError;
            
            if (allCards) {
                cards = allCards;
            }

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
            pageError = 'Échec du chargement des cartes';
        } finally {
            loading = false;
        }
    });

    function openUnlockModal(card) {
        if (!$auth.isAuthenticated) {
            pageError = 'Veuillez vous connecter d\'abord';
            return;
        }
        selectedCard = card;
        password = '';
        modalError = '';
        showUnlockModal = true;
    }

    function viewCard(cardId) {
        if (!$auth.userId) {
            pageError = 'Veuillez vous connecter d\'abord';
            return;
        }

        if (!unlockedCards.has(cardId)) {
            pageError = 'Vous devez d\'abord débloquer cette carte';
            return;
        }

        const token = $page.url.searchParams.get('token');
        goto(`/card/${cardId}?token=${token}`);
    }

    async function tryUnlock() {
        if (!$auth.userId) {
            modalError = 'Veuillez vous connecter d\'abord';
            return;
        }

        try {
            if (selectedCard.unlock_password !== password) {
                modalError = 'Mot de passe incorrect';
                password = '';
                return;
            }

            const { data: existingCards, error: checkError } = await supabase
                .from('user_cards')
                .select('id')
                .eq('user_id', $auth.userId)
                .eq('card_id', selectedCard.id)
                .limit(1);

            if (checkError) throw checkError;

            if (existingCards && existingCards.length > 0) {
                modalError = 'Vous avez déjà cette carte !';
                return;
            }

            const { error: unlockError } = await supabase
                .from('user_cards')
                .insert({
                    user_id: $auth.userId,
                    card_id: selectedCard.id
                });

            if (unlockError) throw unlockError;

            unlockedCards.add(selectedCard.id);
            unlockedCards = unlockedCards;
            showUnlockModal = false;
            
            viewCard(selectedCard.id);
        } catch (e) {
            console.error('Unlock error:', e);
            modalError = 'Échec du déverrouillage de la carte';
        }
    }
</script>

<svelte:head>
    <title>Collection de Cartes</title>
    <meta name="description" content="Votre collection de cartes" />
</svelte:head>

<div class="container">
    <h1>Votre Collection de Cartes</h1>
    
    {#if !$auth.isAuthenticated}
        <div class="login-prompt">
            <p>Veuillez vous connecter pour voir et débloquer des cartes.</p>
            <button on:click={() => goto(`/?token=${$page.url.searchParams.get('token')}`)}>
                Aller à la Connexion
            </button>
        </div>
    {:else if loading}
        <p>Chargement des cartes...</p>
    {:else if pageError}
        <p class="error">{pageError}</p>
    {:else}
        <div class="cards-grid">
            {#each cards as card}
                <div class="card {unlockedCards.has(card.id) ? 'unlocked' : 'locked'}"
                     on:click={() => unlockedCards.has(card.id) ? viewCard(card.id) : openUnlockModal(card)}>
                    <img src={unlockedCards.has(card.id) ? card.image_url : lockedCardImage} 
                         alt={unlockedCards.has(card.id) ? card.name : 'Carte verrouillée'} />
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
                <h2>Débloquer la Carte</h2>
                <p>Entrez le mot de passe pour débloquer cette carte :</p>
                <div class="debug-info">
                    <p><strong>Debug - Mot de passe de la carte :</strong> {selectedCard.unlock_password}</p>
                </div>
                <input
                    type="password"
                    bind:value={password}
                    placeholder="Entrez le mot de passe"
                    on:keydown={(e) => e.key === 'Enter' && tryUnlock()}
                />
                {#if modalError}
                    <p class="error">{modalError}</p>
                {/if}
                <div class="modal-buttons">
                    <button on:click={tryUnlock}>Débloquer</button>
                    <button class="cancel" on:click={() => showUnlockModal = false}>Annuler</button>
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

    .login-prompt {
        text-align: center;
        padding: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

    .debug-info {
        background: #f0f0f0;
        padding: 0.5rem;
        margin: 1rem 0;
        border-radius: 4px;
        font-family: monospace;
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