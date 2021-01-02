import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        name: `Z's Random Thing Selector`
    }
});

export default app;