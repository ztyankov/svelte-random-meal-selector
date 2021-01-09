<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Chip, { Set, Icon, Text } from "@smui/chips";

    const dispatch = createEventDispatcher();

    export let types;
    export let label;
    let className = "";
    export { className as class };
    let selected;

    $: {
        dispatch("optionSelected", { selected });
    }

    $: cssVarStyles = `--label:"${label}"`;
</script>

<style>
    .filter-container {
        display: flex;
        align-items: flex-start;
        position: relative;
        width: 420px;
        margin: 2em auto;
        background-color: #f1f5f7;
        padding: 20px 25px 10px 25px;
        border-radius: 0 10px 10px 0;
        box-shadow: none;
    }

    .filter-container::before {
        content: var(--label);
        display: block;
        position: absolute;
        top: 0;
        left: 23px;
        padding: 6px 10px;
        border-radius: 4px;
        color: rgb(232, 241, 247);
        background-color: rgb(35, 55, 66);
        font-size: var(--font-size-micro);
        font-family: var(--font-family-serif);
        line-height: 1;
        transform: translateY(-14px);
    }

    .filter-container::after {
        content: "";
        position: absolute;
        top: -1px;
        bottom: -1px;
        left: -1px;
        width: 4px;
        background-color: #c7e9fa;
    }
</style>

<div class="filter-container {className}" style={cssVarStyles}>
    <Set chips={types} let:chip choice bind:selected>
        <Chip class="filter-option">
            <Icon class="material-icons" leading>check</Icon>
            <Text>{chip.displayName || chip}</Text>
        </Chip>
    </Set>
</div>
