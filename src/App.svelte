<script lang="typescript">
    import Router from 'svelte-spa-router';
    import active from 'svelte-spa-router/active';
    import { routes } from './routes.config';

    function routeValidationFailed(event: { detail: any }) {
        console.error('routeValidationFailed', event.detail);
    }

    function routeLoaded(event: { detail: any }) {
        console.log('routeLoaded event', event.detail);
    }
</script>

<style>
    :global(body) {
        margin: 0;
    }

    :global(a.active) {
        color: red;
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<nav class="flex relative w-80 mx-auto my-4 rounded-xl shadow-md">
    <ul class="flex flex-col mx-auto text-center">
        <li><a href="#/" use:active>Home</a></li>
        <li><a href="#/dashboard" use:active>Dashboard</a></li>
        <li><a href="#/timer" use:active>Timer</a></li>
        <li><a href="#/profile" use:active>User Profile</a></li>
    </ul>
</nav>

<main class="p-4">
    <Router routes="{routes}" on:conditionsFailed="{routeValidationFailed}" on:routeLoaded="{routeLoaded}" />
</main>
