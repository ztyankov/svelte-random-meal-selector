<script lang="ts">
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    import Card, {
        Content,
        Actions,
        ActionButtons,
        ActionIcons,
        Media,
        MediaContent
    } from "@smui/card";
    import Button, { Label } from "@smui/button";
    import IconButton, { Icon } from "@smui/icon-button";
    import type { IMeal } from "./types/imeal.interface";

    export let meal: IMeal;

    const dispatch = createEventDispatcher();

    let selected = false;

    function toggleSelected() {
        selected = !selected;
        dispatch("toggleSelected", { meal, selected });
    }

    $: cookingTime = `(${meal.cookingTime.min} - ${meal.cookingTime.max})`;
</script>

<style>
    .card-internal-container {
        height: 100%;
    }

    .title-container {
        color: #fff;
        position: absolute;
        bottom: 6px;
        left: 8px;
        padding: 0 5px;
        text-align: left;
        background: rgba(10, 10, 10, 0.45);
        border-radius: 3px;
    }

    .selected {
        background-color: rgb(229, 241, 250);
    }

    div :global(.card-content) {
        height: 70px;
    }

    div :global(.card-media-16x9) {
        border: 1px solid rgba(0,0,0,.12);
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        /* background-image: url('https://placeimg.com/360/200/nature'); */
        background-image: url('/assets/images/meal-placeholder-360x200.jpg');
        /* background-image: url('https://via.placeholder.com/360x200.png?text=Your meal here'); */
    }
</style>

<Card style="width: 360px; border-radius: 0px">
    <div
        class="card-internal-container"
        class:selected
        transition:fly={{ y: 20, duration: 300 }}>
        <Media class="card-media-16x9" aspectRatio="16x9">
            <MediaContent>
                <div class="title-container">
                    <h2 class="mdc-typography--headline6" style="margin: 0;">{meal.name}</h2>
                    <h3 class="mdc-typography--subtitle2" style="margin: 0;">{meal.cuisine}</h3>
                </div>
            </MediaContent>
        </Media>
        <Content class="mdc-typography--body2 card-content">
            <h3 class="mdc-typography--subtitle2" style="margin: 0 0 10px;">
                <strong>Prep time</strong>:
                {cookingTime}
            </h3>
            <div>
                <strong>Ingerdients</strong>:
                {meal.ingredients.join(', ')}
            </div>
        </Content>

        <Actions>
            <ActionButtons>
                <Button on:click={toggleSelected}>
                    <Label>Select</Label>
                </Button>
            </ActionButtons>
            <ActionIcons>
                <IconButton
                    on:click={() => console.log('add to favorites')}
                    toggle
                    aria-label="Add to favorites"
                    title="Add to favorites">
                    <Icon class="material-icons" on>favorite</Icon>
                    <Icon class="material-icons">favorite_border</Icon>
                </IconButton>
                <IconButton
                    class="material-icons"
                    on:click={() => console.log('Share')}
                    title="Share">
                    share
                </IconButton>
                <IconButton
                    class="material-icons"
                    on:click={() => console.log('More options')}
                    title="More options">
                    more_vert
                </IconButton>
            </ActionIcons>
        </Actions>
    </div>
</Card>
