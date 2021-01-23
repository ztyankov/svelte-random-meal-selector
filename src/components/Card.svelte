<script lang="ts">
    export let selected: boolean;
</script>

<style>
    .selected {
        background-color: rgb(229, 241, 250);
    }
</style>

<div class:selected={selected}>
    <slot></slot>
</div>