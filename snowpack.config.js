/** @type { import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: "/",
        src: "/_dist_",
    },
    plugins: [
        [
            "@snowpack/plugin-build-script",
            { cmd: "postcss", input: [".css"], output: [".css"] },
        ],
        "@snowpack/plugin-svelte",
        "@snowpack/plugin-dotenv",
        "@snowpack/plugin-typescript",
    ],
    packageOptions: {
        installTypes: true,
        installOptions: {
            rollup: {
                plugins: [
                    require("rollup-plugin-svelte")({
                        include: ["./node_modules"],
                    })
                ]
            }
        },
    },
    devOptions: {
        open: "none"
        /* ... */
    },
    buildOptions: {
        /* ... */
    },
    alias: {
        /* ... */
    },
};
