<script lang="ts">
    import { onMount } from "svelte";
    import Button, { Label } from "@smui/button";
    import Textfield from "@smui/textfield";
    import Card, {
        Content,
        PrimaryAction,
        Media,
        MediaContent,
        Actions,
        ActionButtons,
        ActionIcons,
    } from "@smui/card";

    import MealCard from "./MealCard.svelte";
    import type { IMeal } from "./types";
    import Search from "./Search.svelte";
    export let name: string;

    let allMeals: IMeal[] = [];
    let selectedMeals: IMeal[] = [];

    onMount(async () => {
        const res = await fetch(`/meals`);
        const data = await res.json();
        allMeals = data.meals;
        selectedMeals = [...allMeals];
    });

    function handleSearchResults(e) {
        selectedMeals = e.detail.results;
    }

    function handleToggleSelected(e) {
        const isSelected = e.detail.selected;
        console.info(
            `User has ${isSelected ? "selected" : "de-selected"} a meal:`,
            e.detail.meal,
            e.detail.selected
        );
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
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<main>
    <h1>Hello {name}!</h1>
    <h2>Search for your next meal!</h2>
    <Search autofocus data={allMeals} on:resultsFound={handleSearchResults}/>
    <div class="results-container">
        {#if selectedMeals.length > 0}
            <div class="results-grid">
                {#each selectedMeals as meal}
                    <MealCard {meal} on:toggleSelected={handleToggleSelected} />
                {/each}
            </div>
        {:else}No meals to show{/if}
    </div>
</main>
