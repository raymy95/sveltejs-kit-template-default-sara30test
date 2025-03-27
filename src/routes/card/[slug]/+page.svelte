<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';

    /** @type {{ cardId: string }} */
    let { data } = $props();
    
    let card = null;
    let loading = true;
    let error = null;
    let answers = [];
    let selectedAnswer = null;
    let showResult = false;
    let isCorrect = false;

    async function loadCard() {
        try {
            if (!$auth.isAuthenticated || !$auth.userId) {
                goto(`/?token=${$page.url.searchParams.get('token')}`);
                return;
            }

            // Load card details first
            const { data: cardData, error: cardError } = await supabase
                .from('cards')
                .select('*')
                .eq('id', data.cardId)
                .single();

            if (cardError) throw cardError;
            if (!cardData) {
                error = 'Card not found';
                return;
            }

            // Then check if user has unlocked this card
            const { data: userCard, error: userCardError } = await supabase
                .from('user_cards')
                .select('*')
                .eq('user_id', $auth.userId)
                .eq('card_id', data.cardId)
                .single();

            if (userCardError) {
                if (userCardError.code === 'PGRST116') {
                    // Card not unlocked - redirect to collection
                    goto(`/collection?token=${$page.url.searchParams.get('token')}`);
                    return;
                }
                throw userCardError;
            }

            // Set up answers if the card has a question
            if (cardData.question && cardData.correct_answer) {
                answers = [
                    { text: cardData.correct_answer, isCorrect: true },
                    { text: cardData.wrong_answer_1, isCorrect: false },
                    { text: cardData.wrong_answer_2, isCorrect: false },
                    { text: cardData.wrong_answer_3, isCorrect: false }
                ].sort(() => Math.random() - 0.5);
            }

            card = cardData;
        } catch (e) {
            console.error('Error loading card:', e);
            error = 'Failed to load card';
        } finally {
            loading = false;
        }
    }

    function checkAnswer(answer) {
        selectedAnswer = answer;
        isCorrect = answer.isCorrect;
        showResult = true;
    }

    function goBack() {
        goto(`/collection?token=${$page.url.searchParams.get('token')}`);
    }

    onMount(() => {
        auth.initialize();
        ;
    });
</script>

<svelte:head>
    <title>{card ? card.name : 'Card'} - Card Collection</title>
    <meta name="description" content="Card detail view" />
</svelte:head>

<div class="container">
  {#await loadCard() then }
    {#if loading}
        <div class="loading">
            <p>Loading card...</p>
        </div>
    {:else if error}
        <div class="error-container">
            <p class="error">{error}</p>
            <button class="back-button" on:click={goBack}>← Back to Collection</button>
        </div>
    {:else if card}
        <button class="back-button" on:click={goBack}>← Back to Collection</button>
        
        <div class="card-detail">
            <img src={card.image_url} alt={card.name} />
            <div class="card-info">
                <h1>{card.name}</h1>
                <p class="description">{card.description}</p>
                <span class="rarity">{card.rarity}</span>
            </div>
        </div>

        {#if card.question && answers.length > 0}
            <div class="question-section">
                <h2>Question:</h2>
                <p class="question">{card.question}</p>

                <div class="answers">
                    {#each answers as answer}
                        <button 
                            class="answer-button"
                            class:selected={selectedAnswer === answer}
                            class:correct={showResult && answer.isCorrect}
                            class:incorrect={showResult && selectedAnswer === answer && !answer.isCorrect}
                            on:click={() => !showResult && checkAnswer(answer)}
                            disabled={showResult}
                        >
                            {answer.text}
                        </button>
                    {/each}
                </div>

                {#if showResult}
                    <div class="result" class:correct={isCorrect} class:incorrect={!isCorrect}>
                        <p>{isCorrect ? 'Correct!' : 'Incorrect!'}</p>
                        {#if !isCorrect}
                            <p>The correct answer was: {card.correct_answer}</p>
                        {/if}
                    </div>
                {/if}
            </div>
        {/if}
    {/if}
    {/await}
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

    .question-section {
        background: white;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: 2rem;
    }

    .question {
        font-size: 1.2rem;
        margin: 1rem 0 2rem;
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
    }

    .answer-button:hover:not(:disabled) {
        background: var(--color-theme-2);
        color: white;
    }

    .answer-button.selected {
        border-color: var(--color-theme-1);
    }

    .answer-button.correct {
        background: #4CAF50;
        color: white;
        border-color: #4CAF50;
    }

    .answer-button.incorrect {
        background: #f44336;
        color: white;
        border-color: #f44336;
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

    .result.incorrect {
        background: #FFEBEE;
        color: #C62828;
    }

    .error {
        color: #f44336;
    }
</style>