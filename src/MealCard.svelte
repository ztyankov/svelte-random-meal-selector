<script lang="ts">
    import { fly } from "svelte/transition";
    import type { IMeal } from "./types";

    export let meal: IMeal;
</script>

<style>
    .item {
        margin-bottom: 15px;
        display: flex;
        align-items: flex-start;
        justify-content: start;
        text-align: left;
        animation-duration: 0.3s;
        background-color: rgb(246, 250, 253);
        padding: 5px 10px;
        /* border-radius: 3px; */
        box-shadow: 1px 1px 1px rgba(68, 68, 68, .12);
    }
</style>

<div class="item">
    <div transition:fly={{ y: 20, duration: 300 }}>
        <h3>Name: {meal.name}</h3>
        <div><strong>Ingerdients</strong>: {meal.ingredients.join(', ')}</div>
        <div><strong>Prep time</strong>: {meal.cookingTime}</div>
    </div>
</div>
