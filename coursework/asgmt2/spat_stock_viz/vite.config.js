// vite.config.js
import {svelte} from '@sveltejs/vite-plugin-svelte';
import {defineConfig} from 'vite';

export default defineConfig({
                                base: "/spat_stock_viz/",
                                plugins: [
                                    svelte({
                                               preprocess: {},
                                           }),
                                ]
                            });
