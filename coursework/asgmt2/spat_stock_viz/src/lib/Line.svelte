<script>
    import * as d3 from 'd3';

    export let data;
    export let fullData;
    export let variable;
    export let filter;
    export let update;

    let margin = {top: 10, right: 30, bottom: 30, left: 40};
    let width = 360;
    let height = 200;
    let chartW = width - margin.left - margin.right;
    let chartH = height - margin.top - margin.bottom;

    let brushLayer;
    let xAxis;
    let yAxis;

    const brush = d3.brushX()
                    .extent([[0, 0], [chartW, chartH]])
                    .on("brush", brushed)
                    .on("end", brushended);

    function brushed(event) {
        if (event && event.selection) {
            filter = [xScale.invert(event.selection[0]), xScale.invert(event.selection[1])];
            update();
        }
    }

    function brushended(event) {
        if (event && !event.selection) {
            filter = [];
            update();
        }
    }

    $: xScale = d3.scaleLinear()
                  .range([0, chartW])
                  .domain(d3.extent(fullData.map((d) => d.properties[variable])));
    $: binData = d3.histogram()
                   .value((d) => d.properties[variable])
                   .domain(xScale.domain())
                   .thresholds(xScale.ticks(30));
    $: backgroundBins = binData(fullData);
    $: bins = binData(data);
    $: yScale = d3.scaleLinear()
                  .range([chartH, 0])
                  .domain([0, d3.max(backgroundBins, (d) => d.length)]);
    $: {
        d3.select(brushLayer)
          .call(brush);
        d3.select(xAxis)
          .call(d3.axisBottom(xScale));

        d3.select(yAxis)
          .call(d3.axisLeft(yScale));
    }
</script>

<main></main>

<style>
</style>
