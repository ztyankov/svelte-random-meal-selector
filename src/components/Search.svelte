<script lang="ts">
    import Card from "./Card.svelte";
    // import Textfield from "@smui/textfield";
    import { createEventDispatcher } from "svelte";

    import { autofocus } from "../actions/autofocus";

    const dispatch = createEventDispatcher();

    export let data: any[] = [];

    let input = undefined;
    let searchTerm = "";
    let results: any[] = [];

    function handleSubmitOnKeyDown() {
        handleSubmit();
    }

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
            return [];
        }
    }

    function notifyResultsFound(results: any[]) {
        dispatch("resultsFound", { results });
    }

    $: {
        handleSubmitOnKeyDown();
    }
</script>

<section>
    <Card selected={false}>
        <div>
            <input type="text" use:autofocus />
            <button on:click={handleSubmit}>Find my meal</button>
        </div>
    </Card>
</section>
