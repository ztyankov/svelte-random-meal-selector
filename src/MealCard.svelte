<script lang="ts">
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    import Card, {
        Content,
        PrimaryAction,
        Media,
        MediaContent,
        Actions,
        ActionButtons,
        ActionIcons,
    } from "@smui/card";
    import Button, { Label } from "@smui/button";
    import IconButton, { Icon } from "@smui/icon-button";
    import type { IMeal } from "./types";

    export let meal: IMeal;

    const dispatch = createEventDispatcher();

    let selected = false;

    function toggleSelected() {
        selected = !selected;
        dispatch("toggleSelected", { meal, selected });
    }
</script>

<style>
    .card-internal-container {
        height: calc(100% - 1px);
    }

    .selected {
        background-color: rgb(229, 241, 250);
    }
</style>

<Card style="width: 360px; height: 200px" variant="outlined">
    <div
        class="card-internal-container"
        class:selected
        transition:fly={{ y: 20, duration: 300 }}>
        <Content style="height: 110px" class="mdc-typography--body2">
            <h2 class="mdc-typography--headline6" style="margin: 0;">
                {meal.name}
            </h2>
            <h3 class="mdc-typography--subtitle2" style="margin: 0 0 10px;">
                <strong>Prep time</strong>:
                {meal.cookingTime}
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
