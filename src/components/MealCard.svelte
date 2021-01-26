<script lang="ts">
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import Card from './Card.svelte';
    import Button from './Button.svelte';
    import type { IMeal } from '../types/imeal.interface';

    export let meal: IMeal;

    const dispatch = createEventDispatcher();

    let selected = false;

    function toggleSelected() {
        selected = !selected;
        dispatch('toggleSelected', { meal, selected });
    }

    $: cookingTime = `(${meal.cookingTime.min} - ${meal.cookingTime.max})`;
</script>

<style>
    .card-label {
        @apply text-lg text-blue-800 font-semibold;
    }
</style>

<Card selected="{selected}">
    <div class="grid grid-rows-2 grid-cols-1 gap-2" transition:fly="{{ y: 20, duration: 300 }}">
        <div class="relative min-w-full sm:mx-0 sm:flex-shrink-0 shadow-md">
            {#if meal.photoUrl}
                <img src="{meal.photoUrl}" alt="Meal example" />
            {:else}<img src="/assets/images/meal-placeholder-360x200.jpg" alt="Meal example" />{/if}
            <div class="absolute bottom-0 left-0 bg-black bg-opacity-40 px-2 py-1">
                <p class="text-lg text-white font-semibold">{meal.name}</p>
                <p class="text-md text-white font-thin italic">{meal.cuisine}</p>
                <p class="text-sm text-white font-thin">{meal.type.join(', ')}</p>
            </div>
        </div>

        <div class="relative text-left space-y-2 py-4 px-4 sm:text-left">
            <div class="space-y-1">
                <p class="text-black">
                    <span class="card-label">Prep time</span>:
                    {cookingTime}
                    min
                </p>
                <p><span class="card-label">Ingerdients</span>: {meal.ingredients.join(', ')}</p>
            </div>
            <div class="absolute left-2 bottom-2">
                <Button primary on:click="{toggleSelected}">Select</Button>
            </div>
        </div>
    </div>
</Card>
