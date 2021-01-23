module.exports = {
    purge: {
        content: ['./src/**/*.svelte', './public/*.html'],
    },
    plugins: [
        // require('@tailwindcss/forms'),
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                svelte: {
                    200: '#ffb199',
                    400: '#ff8b66',
                    600: '#ff6432',
                    800: '#ff3e00'
                }
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                mono: ['Roboto Mono', 'serif']
            },
        },
    },
    variants: {},
    plugins: [],
};