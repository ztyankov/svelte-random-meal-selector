<script lang="ts">
    import Card from "@smui/card";
    import Textfield from "@smui/textfield";
    import Button, { Label } from "@smui/button";
    import { createEventDispatcher } from "svelte";

    import { onMount } from "svelte";

    onMount(() => {
        if (autofocus) {
            input.focus();
        }
    });

    const dispatch = createEventDispatcher();

    export let autofocus = false;
    export let data = [];

    let input = undefined;
    let searchTerm = "";
    let results = [];

    function handleSubmit() {
        results = filterResultsByQuery(searchTerm);
        notifyResultsFound(results);
    }

    function filterResultsByQuery(queryString: string) {
        try {
            if (queryString === "") {
                return [...data];
            }

            const sanitizedSearchTerm = queryString.trim().toLowerCase();

            return data.filter((meal) => {
                return meal.name.toLowerCase().includes(sanitizedSearchTerm);
            });
        } catch (error) {
            console.error(error);
        }
    }

    function notifyResultsFound(results: any[]) {
        dispatch("resultsFound", { results });
    }
</script>

<section>
    <Card style="width: 360px; margin: 0 auto;">
        <div>
            <Textfield
                label="Food idea?"
                bind:this={input}
                bind:value={searchTerm} />
            <Button on:click={handleSubmit}>Find my meal</Button>
        </div>
    </Card>
</section>
