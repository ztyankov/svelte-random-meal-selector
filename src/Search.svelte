<script lang="ts">
    import Card from "@smui/card";
    import Textfield from "@smui/textfield";
    import Button, { Label } from "@smui/button";
    import Chip, {Set, Icon, Text} from '@smui/chips';
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
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
    let mealChoice = 'Breakfast';

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
                label="What would you like to eat?"
                bind:this={input}
                bind:value={searchTerm} />
            <Button on:click={handleSubmit}>Find my meal</Button>
        </div>
    </Card>

    <!-- TODO: Move this to another component for additional filters -->
    <Card style="width: 720px; margin: 1em auto;">
        <div>
            Meal choices:
            <Set chips={mealTypes} let:chip choice bind:selected={mealChoice}>
                <Chip><Text>{chip}</Text></Chip>
            </Set>
        </div>
    </Card>
</section>
