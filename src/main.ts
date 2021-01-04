import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        name: `Z's Next Meal Planner`
    }
});

export default app;