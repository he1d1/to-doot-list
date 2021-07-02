module.exports = {
    purge: ['./index.html', './src/**/*.{svelte,js,ts}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {},
    plugins:
        [
            require('@tailwindcss/forms'),
        ],
}
