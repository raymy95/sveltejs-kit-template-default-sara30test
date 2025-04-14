<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabase';
    import { auth } from '$lib/stores/auth';
    import { onMount, onDestroy } from 'svelte';
    import { Html5Qrcode } from 'html5-qrcode';
    
    let cards = [];
    let unlockedCards = new Set();
    let modalError = '';
    let pageError = '';
    let loading = true;
    let qrScanner = null;
    let showQRScanner = false;
    let cameraError = '';

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

            if ($auth.isAdmin) {
                // Admin sees all cards as unlocked
                unlockedCards = new Set(cards.map(card => card.id));
            } else if ($auth.userId) {
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

    async function startQRScanner() {
        try {
            showQRScanner = true;
            cameraError = '';
            modalError = '';

            // Request camera permissions
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            stream.getTracks().forEach(track => track.stop()); // Release camera immediately

            // Create QR scanner instance
            qrScanner = new Html5Qrcode("qr-reader");

            await qrScanner.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                async (decodedText) => {
                    try {
                        // Find card with matching password
                        const matchingCard = cards.find(card => card.unlock_password === decodedText);
                        
                        if (!matchingCard) {
                            modalError = 'QR Code invalide';
                            return;
                        }

                        // Stop scanner
                        if (qrScanner) {
                            await qrScanner.stop();
                            qrScanner = null;
                        }

                        // Check if card is already unlocked
                        if (unlockedCards.has(matchingCard.id)) {
                            modalError = 'Vous avez déjà cette carte !';
                            return;
                        }

                        // Unlock the card
                        const { error: unlockError } = await supabase
                            .from('user_cards')
                            .insert({
                                user_id: $auth.userId,
                                card_id: matchingCard.id
                            });

                        if (unlockError) throw unlockError;

                        // Update local state
                        unlockedCards.add(matchingCard.id);
                        unlockedCards = unlockedCards;

                        // Close scanner and redirect
                        showQRScanner = false;
                        const token = $page.url.searchParams.get('token');
                        const adminParam = $auth.isAdmin ? '&admin=true' : '';
                        goto(`/card/${matchingCard.id}?token=${token}${adminParam}`);

                    } catch (e) {
                        console.error('QR scan error:', e);
                        modalError = 'Échec du scan du QR Code';
                    }
                },
                (error) => {
                    // Handle scan errors silently
                }
            );
        } catch (error) {
            console.error('Camera error:', error);
            cameraError = 'Impossible d\'accéder à la caméra. Veuillez vérifier les permissions.';
            showQRScanner = false;
        }
    }

    async function stopQRScanner() {
        if (qrScanner) {
            try {
                await qrScanner.stop();
            } catch (e) {
                console.error('Error stopping QR scanner:', e);
            }
            qrScanner = null;
        }
        showQRScanner = false;
    }

    function viewCard(cardId) {
        if (!$auth.userId && !$auth.isAdmin) {
            pageError = 'Veuillez vous connecter d\'abord';
            return;
        }

        if (!unlockedCards.has(cardId) && !$auth.isAdmin) {
            pageError = 'Vous devez d\'abord débloquer cette carte';
            return;
        }

        const token = $page.url.searchParams.get('token');
        const adminParam = $auth.isAdmin ? '&admin=true' : '';
        goto(`/card/${cardId}?token=${token}${adminParam}`);
    }

    // Cleanup on unmount
    onDestroy(() => {
        if (qrScanner) {
            qrScanner.stop().catch(console.error);
        }
    });
</script>

<svelte:head>
    <title>Collection de Cartes</title>
    <meta name="description" content="Ta collection de cartes" />
</svelte:head>

<div class="container">
    <h1>Ta Collection de Cartes</h1>
    
    {#if !$auth.isAuthenticated && !$auth.isAdmin}
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
        {#if !$auth.isAdmin}
            <div class="scan-button-container">
                <button class="scan-button" on:click={startQRScanner}>
                    Scanner un QR Code
                </button>
            </div>
        {/if}

        <div class="cards-grid">
            {#each cards as card}
                <div class="card {unlockedCards.has(card.id) || $auth.isAdmin ? 'unlocked' : 'locked'}"
                     on:click={() => (unlockedCards.has(card.id) || $auth.isAdmin) && viewCard(card.id)}>
                    <img src={unlockedCards.has(card.id) || $auth.isAdmin ? card.image_url : lockedCardImage} 
                         alt={unlockedCards.has(card.id) || $auth.isAdmin ? card.name : 'Carte verrouillée'} />
                    <div class="card-info">
                        <h3>{unlockedCards.has(card.id) || $auth.isAdmin ? card.name : '???'}</h3>
                        {#if unlockedCards.has(card.id) || $auth.isAdmin}
                            <p>{card.description}</p>
                            <span class="rarity">{card.rarity}</span>
                            {#if $auth.isAdmin}
                                <div class="admin-info">
                                    <p class="password">Password: {card.unlock_password}</p>
                                    {#if card.question}
                                        <p class="question">Q: {card.question}</p>
                                        <p class="answer">A: {card.correct_answer}</p>
                                    {/if}
                                </div>
                            {/if}
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    {/if}

    {#if showQRScanner}
        <div class="modal-overlay">
            <div class="modal">
                <h2>Scanner un QR Code</h2>
                
                {#if cameraError}
                    <div class="error-box">
                        <p>{cameraError}</p>
                    </div>
                {:else}
                    <p>Placez le QR Code devant votre caméra</p>
                    <div id="qr-reader"></div>
                {/if}

                {#if modalError}
                    <p class="error">{modalError}</p>
                {/if}

                <button class="cancel" on:click={stopQRScanner}>Fermer</button>
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

    .scan-button-container {
        text-align: center;
        margin-bottom: 2rem;
    }

    .scan-button {
        padding: 0.75rem 1.5rem;
        font-size: 1.1rem;
        background: var(--color-theme-1);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .scan-button:hover {
        background: var(--color-theme-2);
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
    }

    .card.unlocked {
        cursor: pointer;
    }

    .card.unlocked:hover {
        transform: translateY(-5px);
    }

    .card.locked {
        filter: grayscale(1);
        cursor: not-allowed;
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

    .admin-info {
        margin-top: 1rem;
        padding: 0.5rem;
        background: #f5f5f5;
        border-radius: 4px;
        font-size: 0.8rem;
    }

    .admin-info p {
        margin: 0.25rem 0;
    }

    .password {
        color: #e91e63;
        font-family: monospace;
    }

    .question {
        color: #2196f3;
    }

    .answer {
        color: #4caf50;
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
        z-index: 1000;
    }

    .modal {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
        text-align: center;
    }

    #qr-reader {
        width: 100%;
        margin: 1rem 0;
    }

    #qr-reader video {
        width: 100% !important;
        border-radius: 8px;
    }

    .error-box {
        background: #ffebee;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 4px;
        color: #c62828;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background: var(--color-theme-1);
        color: white;
        transition: background-color 0.2s;
    }

    button:hover {
        background: var(--color-theme-2);
    }

    button.cancel {
        background: #ccc;
        margin-top: 1rem;
    }

    button.cancel:hover {
        background: #999;
    }

    .error {
        color: red;
        margin-top: 0.5rem;
    }

    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        .modal {
            width: 95%;
            padding: 1rem;
        }
    }
</style>