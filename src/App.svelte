<script lang="ts">
    import { onMount } from "svelte";
    import Button, {Label} from '@smui/button';
    import Textfield from '@smui/textfield';
    import Card, {Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons} from '@smui/card';

    import MealCard from "./MealCard.svelte";
    import type { IMeal } from "./types";
    export let name: string;

    let allMeals: IMeal[] = [];
    let selectedMeals: IMeal[] = [];
    let searchTerm = "";

    onMount(async () => {
        const res = await fetch(`/meals`);
        const data = await res.json();
        allMeals = data.meals;
        selectedMeals = [...allMeals];
    });

    function getMealBySearchTerm(e: KeyboardEvent) {
        try {
            if (searchTerm === "") {
                selectedMeals = [...allMeals];
                return;
            }

            const sanitizedSearchTerm = searchTerm.trim().toLowerCase();

            selectedMeals = allMeals.filter((meal) => {
                return meal.name.toLowerCase().includes(sanitizedSearchTerm);
            });

            console.log("selectedMeals:", selectedMeals);
        } catch (error) {
            console.error(error);
        }
    }

    function handleToggleSelected(e) {
        const isSelected = e.detail.selected;
        console.info(`User has ${isSelected ? 'selected' : 'de-selected'} a meal:`, e.detail.meal, e.detail.selected);
    }
</script>

<style>
    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
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
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: max-content;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono">
</svelte:head>

<main>
    <h1>Hello {name}!</h1>
    <Card style="width: 360px; margin: 0 auto;">
        <div>
            <Textfield
                label="Search for a meal"
                bind:value={searchTerm} />
            <Button on:click={getMealBySearchTerm}>Find my meal</Button>
        </div>
    </Card>
    <div class="results-container">
        {#if selectedMeals.length > 0}
            <div class="results-grid">
                {#each selectedMeals as meal}
                    <MealCard
                        {meal}
                        on:toggleSelected={handleToggleSelected} />
                {/each}
            </div>
        {:else}No meals to show{/if}
    </div>
</main>
