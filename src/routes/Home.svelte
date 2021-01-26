<script lang="ts">
    import { onMount } from 'svelte';

    import MealCard from '../components/MealCard.svelte';
    import Search from '../components/Search.svelte';
    import { MealTypeEnum } from '../types/mealType.enum';
    import Filter from '../components/Filter.svelte';
    import type { IMeal } from '../types/imeal.interface';
    import { getAllMeals } from '../services/meals';
    export let appName: string;

    let allMeals: IMeal[] = [];
    let selectedMeals: IMeal[] = [];
    let foundMeals: IMeal[] = [];

    const mealTypes = [
        MealTypeEnum.BREAKFAST,
        MealTypeEnum.BRUNCH,
        MealTypeEnum.LUNCH,
        MealTypeEnum.DINNER,
    ];

    const prepTime = [
        { displayName: '5 - 10', data: { min: 5, max: 10 } },
        { displayName: '10 - 15', data: { min: 10, max: 15 } },
        { displayName: '15 - 20', data: { min: 15, max: 20 } },
        { displayName: '20 - 30', data: { min: 20, max: 30 } },
        { displayName: '30 - 45', data: { min: 30, max: 45 } },
    ];

    let mealTypeSelection: MealTypeEnum;
    let prepTimeSelection: { min: number; max: number };

    onMount(async () => {
        const res = await getAllMeals();
        const data = await res.json();
        allMeals = data.meals;
        foundMeals = allMeals;
    });

    function handleSearchResults(event: CustomEvent) {
        foundMeals = event.detail.results;
    }

    function handleFilterByMealType(event: CustomEvent) {
        mealTypeSelection = event.detail.selected;
    }

    function handleFilterByPrepTime(event: CustomEvent) {
        prepTimeSelection = event.detail.selected;
    }

    function handleToggleSelected(e: { detail: { selected: any; meal: any } }) {
        const isSelected = e.detail.selected;
        console.info(
            `User has ${isSelected ? 'selected' : 'de-selected'} a meal:`,
            e.detail.meal,
            e.detail.selected
        );
    }

    function filterByType(type: MealTypeEnum) {
        if (!type) {
            return selectedMeals;
        }

        return selectedMeals.filter((item) => {
            return item.type.indexOf(type) !== -1;
        });
    }

    function filterByPrepTime(prepTime: { min?: number; max?: number; data?: any }) {
        if (!prepTime) {
            return selectedMeals;
        }

        return selectedMeals.filter((item) => {
            return (
                item.cookingTime.max <= prepTime.data.max &&
                item.cookingTime.min >= prepTime.data.min
            );
        });
    }

    $: {
        selectedMeals = foundMeals;
        selectedMeals = filterByType(mealTypeSelection);
        selectedMeals = filterByPrepTime(prepTimeSelection);
    }
</script>

<style>
    :global(body) {
        margin: 0;
        font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
        display: grid;
    }

    .filter-boxes {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    h1 {
        color: #ff3e00;
        text-transform: capitalize;
        font-size: 3em;
        font-weight: 100;
    }

    .results-container {
        padding: 1em 0.5em;
    }

    .results-grid {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    h1 {
        pointer-events: none;
        margin-bottom: 3rem;
    }
    @keyframes App-logo-pulse {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.02);
        }
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
    />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<main>
    <h1>Welcome to {appName}!</h1>
    <Search data="{allMeals}" on:resultsFound="{handleSearchResults}" />

    <div class="filter-boxes">
        <Filter
            class="filter-box"
            types="{mealTypes}"
            label="Meal Type"
            on:optionSelected="{handleFilterByMealType}"
        />
        <Filter
            class="filter-box"
            types="{prepTime}"
            label="Prep Time"
            on:optionSelected="{handleFilterByPrepTime}"
        />
    </div>

    <div class="results-container">
        {#if selectedMeals.length > 0}
            <div class="results-grid">
                {#each selectedMeals as meal}
                    <MealCard meal="{meal}" on:toggleSelected="{handleToggleSelected}" />
                {/each}
            </div>
        {:else}No meals to show{/if}
    </div>
</main>
