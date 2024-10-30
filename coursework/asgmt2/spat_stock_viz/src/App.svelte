<script>
    import * as d3 from "d3";
    import {onMount} from "svelte";
    import {draw_map} from "./lib/map.js";
    import {render_bar} from "./lib/bar.js";
    import {render_bar2} from "./lib/bar2.js";
    import {render_line} from "./lib/line.js";
    import {treemap} from "./lib/tree.js";

    // Import global stylesheet
    import "./lib/app.css";

    let charts_funcs;
    let values;

    // function to parse date in CSV data
    function parseDate(data, dateField) {
        data.forEach((d) => (d[dateField] = new Date(d[dateField])));
    }

    // Main function to load data and initialize charts
    async function initializeCharts() {
        try {
            // Load data asynchronously from CSV and geojson
            const [table, geo_state, geo_city] = await Promise.all([
                                                                       d3.csv("company_data_fulll.csv"),
                                                                       d3.json("us-states.json"),
                                                                       d3.json("my_geometry.geojson")
                                                                   ]);

            // Store data in values array
            values = [table, geo_state, geo_city];
            charts_funcs = {render_bar, render_line, treemap, draw_map, render_bar2};

            // Parse dates in the loaded data
            parseDate(values[0], 'founded');

            // Render all charts
            draw_map(values, charts_funcs);
            render_bar(values, charts_funcs);
            render_bar2(values, charts_funcs);
            render_line(values, charts_funcs);
            treemap(values, charts_funcs);
        } catch (error) {
            console.error("Error loading or rendering data:", error);
        }
    }

    onMount(initializeCharts);

</script>


<main>
    <h1>A Glimpse into S&P 500 by Headquarters Location, Market Capitalization, Sector Distribution</h1>
    <div class="d3-tip"></div>
    <section class="charts">
        <div class="chart" id="map"></div>
        <section>
            <section class="chart" id="bararea">
                <div id="bar"></div>
                <div id="bar2"></div>
            </section>
        </section>
        <div class="chart" id="line"></div>
        <div class="chart" id="treemap"></div>
    </section>
</main>

<style>

    #bararea {
        display: grid;
        grid-template-columns: 1fr 1fr;

    }

    #bar {
        width: 100%;
        height: 100%;
    }

    #bar2 {
        width: 100%;
        height: 100%;
    }

    .d3-tip {
        display: none;
        position: absolute;
        z-index: 9999;
    }

    .charts {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .charts .chart {
        width: 40vw;
        height: 40vh;
    }

    .chart {
        /* rounded corner */
        border-radius: 15px;

        /* add border */
        border: 2px solid #ddd;

        /* floating */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2),
        0 6px 20px rgba(0, 0, 0, 0.19);

        /* smoothing effect upon hover */
        transition: all 0.3s ease-in-out;
        padding: 20px;
        background-color: #fff;
    }

    /* lift upon hover */
    .chart:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3),
        0 12px 40px rgba(0, 0, 0, 0.25);
        transform: translateY(-10px);
    }
</style>
