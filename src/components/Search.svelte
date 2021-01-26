<script lang="ts">
    import Card from './Card.svelte';
    import Button from './Button.svelte';
    import { createEventDispatcher } from 'svelte';
    import { autofocus } from '../actions/autofocus';

    const dispatch = createEventDispatcher();

    export let data: any[] = [];
    let searchTerm = '';
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
            if (queryString === '') {
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
        dispatch('resultsFound', { results });
    }

    $: {
        handleSubmitOnKeyDown();
    }
</script>

<section>
    <Card>
        <div class="flex-row flex px-1 py-2">
            <input class="field mr-1" type="text" use:autofocus bind:value="{searchTerm}" />
            <Button secondary on:click="{handleSubmit}">Find my meal</Button>
        </div>
    </Card>
</section>
