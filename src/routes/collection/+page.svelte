<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabase';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { Html5Qrcode } from 'html5-qrcode';
    
    let cards = [];
    let unlockedCards = new Set();
    let selectedCard = null;
    let password = '';
    let modalError = '';
    let pageError = '';
    let showUnlockModal = false;
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
        cameraError = '';
        showUnlockModal = true;
        showQRScanner = false;
    }

    async function startQRScanner() {
        try {
            showQRScanner = true;
            cameraError = '';
            modalError = '';

            // Check if camera permissions are available
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === 'videoinput');
            
            if (cameras.length === 0) {
                throw new Error('Aucune caméra détectée sur votre appareil');
            }

            // Create QR scanner instance
            qrScanner = new Html5Qrcode('qr-reader');

            // Start scanning with the first available camera
            await qrScanner.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                onScanSuccess,
                onScanFailure
            );
        } catch (error) {
            console.error('Camera error:', error);
            cameraError = error.message || 'Impossible d\'accéder à la caméra. Veuillez vérifier les permissions.';
            showQRScanner = false;
        }
    }

    async function onScanSuccess(decodedText) {
        try {
            // Stop the scanner
            if (qrScanner) {
                await qrScanner.stop();
                qrScanner = null;
            }

            if (!selectedCard || selectedCard.unlock_password !== decodedText) {
                modalError = 'QR Code invalide';
                return;
            }

            await unlockCard();
        } catch (e) {
            console.error('QR scan error:', e);
            modalError = 'Échec du scan du QR Code';
        }
    }

    function onScanFailure(error) {
        // Handle scan failure silently to avoid flooding the console
    }

    async function tryUnlock() {
        if (!selectedCard || !password) {
            modalError = 'Veuillez entrer un mot de passe';
            return;
        }

        if (selectedCard.unlock_password !== password) {
            modalError = 'Mot de passe incorrect';
            password = '';
            return;
        }

        await unlockCard();
    }

    async function unlockCard() {
        try {
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
            closeModal();
            
            viewCard(selectedCard.id);
        } catch (e) {
            console.error('Unlock error:', e);
            modalError = 'Échec du déverrouillage de la carte';
        }
    }

    async function closeModal() {
        if (qrScanner) {
            try {
                await qrScanner.stop();
            } catch (e) {
                console.error('Error stopping QR scanner:', e);
            }
            qrScanner = null;
        }
        showUnlockModal = false;
        showQRScanner = false;
        modalError = '';
        cameraError = '';
        password = '';
        selectedCard = null;
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
</script>

<svelte:head>
    <title>Collection de Cartes</title>
    <meta name="description" content="Ta collection de cartes" />
</svelte:head>

<div class="container">
    <h1>Ta Collection de Cartes</h1>
    
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
                
                {#if selectedCard}
                    <div class="debug-info">
                        <p><strong>{selectedCard.name}:</strong> {selectedCard.unlock_password}</p>
                    </div>
                {/if}

                {#if showQRScanner}
                    {#if cameraError}
                        <div class="error-box">
                            <p>{cameraError}</p>
                            <button class="secondary" on:click={() => showQRScanner = false}>
                                Utiliser le mot de passe à la place
                            </button>
                        </div>
                    {:else}
                        <p>Placez le QR Code devant votre caméra pour débloquer la carte</p>
                        <div id="qr-reader"></div>
                        <button class="secondary" on:click={() => showQRScanner = false}>
                            Utiliser le mot de passe à la place
                        </button>
                    {/if}
                {:else}
                    <div class="password-input">
                        <input
                            type="password"
                            bind:value={password}
                            placeholder="Entrez le mot de passe"
                            on:keydown={(e) => e.key === 'Enter' && tryUnlock()}
                        />
                        <button on:click={tryUnlock}>Débloquer</button>
                    </div>
                    <button class="secondary" on:click={startQRScanner}>
                        Scanner un QR Code à la place
                    </button>
                {/if}

                {#if modalError}
                    <p class="error">{modalError}</p>
                {/if}

                <div class="modal-buttons">
                    <button class="cancel" on:click={closeModal}>Fermer</button>
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

    .debug-info {
        background: #f5f5f5;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 4px;
        text-align: left;
    }

    .debug-info p {
        margin: 0;
        font-family: monospace;
    }

    .password-input {
        display: flex;
        gap: 0.5rem;
        margin: 1rem 0;
    }

    .password-input input {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
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

    .modal-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1rem;
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

    button.secondary {
        background: #666;
        margin: 1rem 0;
    }

    button.secondary:hover {
        background: #888;
    }

    button.cancel {
        background: #ccc;
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

        .password-input {
            flex-direction: column;
        }
    }
</style>