<script lang="ts">
    export let selected = false;
</script>

<style>
    .selected {
        background-color: rgb(229, 241, 250);
        border: 1px solid rgb(250, 249, 249);
    }

    :global(img) {
        @apply rounded-t-xl;
    }
</style>

<div class="relative w-80 mx-auto bg-white border rounded-xl shadow-md" class:selected>
    <slot />
</div>
