<script lang="ts">
    import { onMount } from "svelte";
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
    });

    function getMealBySearchTerm(e) {
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
</script>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: capitalize;
        font-size: 3em;
        font-weight: 100;
    }

    .meals-grid {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(5, 1fr);
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<main>
    <h1>Hello {name}!</h1>
    <div class="search-block">
        <input
            type="text"
            placeholder="Search for a meal"
            bind:value={searchTerm} />
        <button on:click={getMealBySearchTerm}>Find this meal</button>
    </div>
    <div class="meals">
        {#if selectedMeals.length > 0}
            <div class="meals-grid">
                {#each selectedMeals as meal}
                    <MealCard {meal} />
                {/each}
            </div>
        {:else}No meals to show{/if}
    </div>
</main>
