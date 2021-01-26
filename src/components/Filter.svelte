<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let types: any[];
    export let label: string;

    const dispatch = createEventDispatcher();
    const SELECT_ALL = 'All';

    let className = '';
    export { className as class };
    let selected = SELECT_ALL;

    $: {
        const selection = selected === SELECT_ALL ? null : selected;
        dispatch('optionSelected', { selected: selection });
    }

    $: cssVarStyles = `--label:"${label}"`;
</script>

<style>
    .filter-container {
        display: flex;
        align-items: flex-start;
        position: relative;
        /* width: 420px; */
        margin: 2em auto;
        background-color: #f1f5f7;
        padding: 20px 25px 10px 25px;
        border-radius: 0 10px 10px 0;
        box-shadow: none;
    }

    .filter-container input[type='checkbox'],
    input[type='radio'] {
        display: none;
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
        content: '';
        position: absolute;
        top: -1px;
        bottom: -1px;
        left: -1px;
        width: 4px;
        background-color: #c7e9fa;
    }

    .selected {
        @apply bg-svelte-600;
    }

    label {
        @apply px-4 py-1 bg-gray-300 ml-2 rounded-lg hover:bg-svelte-400 cursor-pointer;
    }
</style>

<div class="filter-container {className}" style="{cssVarStyles}">
    {#each types as type}
        <label class:selected="{selected === type}"><input
                type="radio"
                bind:group="{selected}"
                value="{type}"
            />{type.displayName || type}</label>
    {/each}
    <label class:selected="{selected === SELECT_ALL}"><input
            type="radio"
            bind:group="{selected}"
            value="{SELECT_ALL}"
        />{SELECT_ALL}</label>
</div>
