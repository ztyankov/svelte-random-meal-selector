<script lang="ts">
    export let primary = false;
    export let secondary = false;
</script>

<style>
</style>

<button class:primary class:secondary on:click><slot /></button>
