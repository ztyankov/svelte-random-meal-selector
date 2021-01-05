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
    import Chip, { Set, Icon, Text } from "@smui/chips";

    import MealCard from "./MealCard.svelte";
    import Search from "./Search.svelte";
    import type { IMeal } from "./types/imeal.interface";
    import { MealTypeEnum } from "./types/mealType.enum";
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
    let mealChoice: MealTypeEnum;

    onMount(async () => {
        const res = await fetch(`/meals`);
        const data = await res.json();
        allMeals = data.meals;
    });

    function handleSearchResults(e) {
        foundMeals = e.detail.results;
    }

    function handleToggleSelected(e) {
        const isSelected = e.detail.selected;
        console.info(
            `User has ${isSelected ? "selected" : "de-selected"} a meal:`,
            e.detail.meal,
            e.detail.selected
        );
    }

    function filerByType(type: MealTypeEnum) {
        if (!type) {
            return selectedMeals;
        }

        return selectedMeals.filter((item) => {
            return item.type.indexOf(type) !== -1;
        });
    }

    $: {
        selectedMeals = (foundMeals.length && foundMeals) || allMeals;
        selectedMeals = filerByType(mealChoice);
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
    <h1>Welcome to {appName}!</h1>
    <h2>Let's find your next meal!</h2>
    <Search autofocus data={allMeals} on:resultsFound={handleSearchResults} />

    <!-- TODO: Move this to another component for additional filters -->
    <Card style="width: 400px; margin: 1em auto;">
        <div>
            <Content class="mdc-typography--body2">
            <h3 class="mdc-typography--subtitle2" style="margin: 0 0 10px;">Meal choices:</h3>
            <Set
                chips={mealTypes}
                let:chip
                choice
                bind:selected={mealChoice}
                on:checked={filerByType}>
                <Chip>
                    <Text>{chip}</Text>
                </Chip>
            </Set>
            </Content>
        </div>
    </Card>

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
