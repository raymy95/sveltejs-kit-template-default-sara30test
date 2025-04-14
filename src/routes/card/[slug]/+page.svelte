<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';

    /** @type {{ cardId: string }} */
    let { data } = $props();
    
    let card = $state(null);
    let loading = $state(true);
    let error = $state(null);
    let answers = $state([]);
    let wrongAnswers = $state(0);
    let selectedAnswers = $state(new Set());
    let correctAnswerRevealed = $state(false);
    let alreadyAnsweredCorrectly = $state(false);
    let initialized = false;
    let updatingDatabase = $state(false);

    async function loadCard() {
        if (!initialized || (!$auth.isAuthenticated && !$auth.isAdmin) || (!$auth.userId && !$auth.isAdmin) || !data.cardId) {
            return;
        }

        try {
            loading = true;
            error = null;

            const { data: cardData, error: cardError } = await supabase
                .from('cards')
                .select('*')
                .eq('id', data.cardId)
                .single();

            if (cardError) throw cardError;
            if (!cardData) {
                error = 'Carte non trouvée';
                return;
            }

            if ($auth.isAdmin) {
                // Admin mode - show all card info without user_cards lookup
                alreadyAnsweredCorrectly = true;
                card = cardData;
            } else {
                const { data: userCard, error: userCardError } = await supabase
                    .from('user_cards')
                    .select('*')
                    .eq('user_id', $auth.userId)
                    .eq('card_id', data.cardId)
                    .single();

                if (userCardError && userCardError.code !== 'PGRST116') {
                    throw userCardError;
                }

                if (!userCard) {
                    goto(`/collection?token=${$page.url.searchParams.get('token')}`);
                    return;
                }

                alreadyAnsweredCorrectly = userCard.answered_correctly || false;
                wrongAnswers = userCard.wrong_answers || 0;

                if (cardData.question && cardData.correct_answer && !alreadyAnsweredCorrectly) {
                    answers = [
                        { id:1, text: cardData.correct_answer, isCorrect: true, isChecked:false },
                        { id:2, text: cardData.wrong_answer_1, isCorrect: false, isChecked:false },
                        { id:3, text: cardData.wrong_answer_2, isCorrect: false, isChecked:false },
                        { id:4, text: cardData.wrong_answer_3, isCorrect: false, isChecked:false }
                    ].sort(() => Math.random() - 0.5);
                }

                card = cardData;
            }
        } catch (e) {
            console.error('Error loading card:', e);
            error = 'Échec du chargement de la carte';
        } finally {
            loading = false;
        }
    }

    async function checkAnswer(answer) {
        if (!$auth.userId || !data.cardId || updatingDatabase || correctAnswerRevealed || $auth.isAdmin) return;

        try {
            if (answer.isCorrect) {
                correctAnswerRevealed = true;
                updatingDatabase = true;

                const { error: updateError } = await supabase.rpc('update_card_score', {
                    user_id_param: $auth.userId,
                    card_id_param: data.cardId,
                    is_correct: true
                });

                if (updateError) throw updateError;
                alreadyAnsweredCorrectly = true;
            } else {
                selectedAnswers.add(answer.id);
                selectedAnswers = selectedAnswers;
                answer.isChecked = true;
                wrongAnswers++;

                const { error: updateError } = await supabase.rpc('update_card_score', {
                    user_id_param: $auth.userId,
                    card_id_param: data.cardId,
                    is_correct: false
                });

                if (updateError) throw updateError;
            }
        } catch (e) {
            console.error('Error updating score:', e);
            error = 'Échec de la mise à jour du score';
        } finally {
            updatingDatabase = false;
        }
    }

    function goBack() {
        const token = $page.url.searchParams.get('token');
        const adminParam = $auth.isAdmin ? '&admin=true' : '';
        goto(`/collection?token=${token}${adminParam}`);
    }

    onMount(() => {
        auth.initialize();
        initialized = true;
    });

    $effect(() => {
        if (initialized && ($auth.isAuthenticated || $auth.isAdmin) && ($auth.userId || $auth.isAdmin) && data.cardId) {
            loadCard();
        } else if (initialized && !$auth.isAuthenticated && !$auth.isAdmin) {
            goto(`/?token=${$page.url.searchParams.get('token')}`);
        }
    });
</script>

<svelte:head>
    <title>{card ? card.name : 'Carte'} - Collection de Cartes</title>
    <meta name="description" content="Vue détaillée de la carte" />
</svelte:head>

<div class="container">
    {#if loading}
        <div class="loading">
            <p>Chargement de la carte...</p>
        </div>
    {:else if error}
        <div class="error-container">
            <p class="error">{error}</p>
            <button class="back-button" on:click={goBack}>← Retour à la Collection</button>
        </div>
    {:else if !initialized || (!$auth.isAuthenticated && !$auth.isAdmin)}
        <div class="loading">
            <p>Initialisation...</p>
        </div>
    {:else if card}
        <button class="back-button" on:click={goBack}>← Retour à la Collection</button>
        
        <div class="card-detail">
            <img src={card.image_url} alt={card.name} />
            <div class="card-info">
                <h1>{card.name}</h1>
                <p class="description">{card.description}</p>
                <span class="rarity">{card.rarity}</span>
                
                {#if $auth.isAdmin}
                    <div class="admin-info">
                        <p class="password">Password: {card.unlock_password}</p>
                    </div>
                {/if}
            </div>
        </div>

        {#if card.question && !$auth.isAdmin}
            <div class="question-section">
                <h2>Question :</h2>
                <p class="question">{card.question}</p>

                {#if alreadyAnsweredCorrectly}
                    <div class="already-answered">
                        <p>Vous avez déjà répondu correctement à cette question !</p>
                        <p>La bonne réponse est : {card.correct_answer}</p>
                        <p>Il vous a fallu {wrongAnswers} {wrongAnswers === 1 ? 'tentative incorrecte' : 'tentatives incorrectes'} avant de trouver la bonne réponse.</p>
                    </div>
                {:else if answers.length > 0}
                    <div class="answers">
                        {#each answers as answer}
                            <button 
                                class="answer-button"
                                class:correct={correctAnswerRevealed && answer.isCorrect}
                                class:incorrect={answer.isChecked}
                                class:disabled={updatingDatabase || correctAnswerRevealed}
                                on:click={() => checkAnswer(answer)}
                                disabled={updatingDatabase || correctAnswerRevealed}
                            >
                                {answer.text}
                                {#if updatingDatabase && answer.isCorrect}
                                    <span class="loading-indicator">...</span>
                                {/if}
                            </button>
                        {/each}
                    </div>

                    {#if correctAnswerRevealed}
                        <div class="result correct">
                            <p>Correct ! +{5 - Math.min(wrongAnswers, 4)} points</p>
                        </div>
                    {/if}

                    <div class="wrong-answers">
                        <p>Tentatives incorrectes : {wrongAnswers}</p>
                        {#if wrongAnswers > 0 && !correctAnswerRevealed}
                            <p class="points-info">La prochaine bonne réponse vous donnera {5 - Math.min(wrongAnswers, 4)} points</p>
                        {/if}
                    </div>
                {/if}
            </div>
        {:else if card.question && $auth.isAdmin}
            <div class="question-section admin">
                <h2>Question :</h2>
                <p class="question">{card.question}</p>
                <div class="admin-answers">
                    <p class="correct-answer">Bonne réponse : {card.correct_answer}</p>
                    <p>Mauvaises réponses :</p>
                    <ul>
                        <li>{card.wrong_answer_1}</li>
                        <li>{card.wrong_answer_2}</li>
                        <li>{card.wrong_answer_3}</li>
                    </ul>
                </div>
            </div>
        {/if}
    {/if}
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .loading, .error-container {
        text-align: center;
        padding: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .back-button {
        margin-bottom: 2rem;
        padding: 0.5rem 1rem;
        background: var(--color-theme-2);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .back-button:hover {
        background: var(--color-theme-1);
    }

    .card-detail {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
    }

    .card-detail img {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }

    .card-info {
        padding: 2rem;
    }

    .description {
        margin: 1rem 0;
        line-height: 1.6;
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
    }

    .admin-info .password {
        color: #e91e63;
        font-family: monospace;
        margin: 0;
    }

    .question-section {
        background: white;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: 2rem;
    }

    .question-section.admin .admin-answers {
        margin-top: 1rem;
        padding: 1rem;
        background: #f5f5f5;
        border-radius: 4px;
    }

    .admin-answers .correct-answer {
        color: #4caf50;
        font-weight: bold;
    }

    .admin-answers ul {
        list-style-type: none;
        padding: 0;
        margin: 0.5rem 0;
    }

    .admin-answers li {
        color: #f44336;
        margin: 0.25rem 0;
    }

    .question {
        font-size: 1.2rem;
        margin: 1rem 0 2rem;
    }

    .already-answered {
        text-align: center;
        padding: 1rem;
        background: #E8F5E9;
        border-radius: 4px;
        color: #2E7D32;
    }

    .answers {
        display: grid;
        gap: 1rem;
    }

    .answer-button {
        padding: 1rem;
        border: 2px solid var(--color-theme-2);
        border-radius: 4px;
        background: white;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.2s;
        position: relative;
    }

    .answer-button:not(.disabled):hover {
        background: var(--color-theme-2);
        color: white;
    }

    .answer-button.correct {
        background-color: #4CAF50 !important;
        border-color: #4CAF50 !important;
        color: white !important;
    }

    .answer-button.incorrect {
        background-color: #f44336 !important;
        border-color: #f44336 !important;
        color: white !important;
    }

    .answer-button.disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .loading-indicator {
        position: absolute;
        right: 1rem;
        animation: pulse 1s infinite;
    }

    @keyframes pulse {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
    }

    .result {
        margin-top: 2rem;
        padding: 1rem;
        border-radius: 4px;
        text-align: center;
    }

    .result.correct {
        background: #E8F5E9;
        color: #2E7D32;
    }

    .wrong-answers {
        margin-top: 2rem;
        text-align: center;
        padding: 1rem;
        background: #f5f5f5;
        border-radius: 4px;
    }

    .points-info {
        color: var(--color-theme-2);
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }

    .error {
        color: #f44336;
    }

    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }
    }
</style>