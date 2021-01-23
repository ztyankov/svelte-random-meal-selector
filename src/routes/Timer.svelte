<script>
    import { onMount } from "svelte";

    let count: number = 0;

    onMount(() => {
        const interval = setInterval(() => count++, 1000);
        return () => {
            clearInterval(interval);
        };
    });
</script>

<h2>Welcome to the home page</h2>

<div class="w-64 py-2 px-2 mx-auto bg-white rounded-xl shadow-md my-4">
    <p class="text-center space-y-2">
        Page has been open for
        <code class="bg-gray-200 px-2">{count}</code>
        seconds.
    </p>
</div>