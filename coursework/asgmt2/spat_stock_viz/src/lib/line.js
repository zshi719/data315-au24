import * as d3 from 'd3'

export function render_line(values, charts_funcs) {

    let sp_data = values[0]
    let x_dimension = "founded"
    let chart_data = d3.rollups(sp_data, d => d.length, d => d.founded)
    chart_data.sort((a, b) => a[0] > b[0] ? 1 : -1)
    const div = d3.select(`#line`);
    div.selectAll("*").remove()
    const width = div.node().getBoundingClientRect().width * 0.9;
    const height = div.node().getBoundingClientRect().height * 0.9;
    const margin = {left: 44, right: 44, top: 44, bottom: 44};
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = div
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    const svgWidth = svg.node().getBoundingClientRect().width;

// Set title text and position it in the center of the SVG, with extra vertical spacing
    svg.selectAll(".title")
       .data([0])
       .join("text")
       .attr("class", "title")
       .attr("font-size", 18)
       .attr("fill", "#000182")
       .attr("font-weight", "bold")
       .attr("font-family", "Lora")
       .attr("text-anchor", "middle") // Center the text anchor
       .attr("x", svgWidth / 2)       // Horizontally center text
       .attr("y", 20)                 // Set vertical position with more space
       .text("S&P 500 Company Founding Timeline");

    svg.selectAll(".subtitle")
       .data([0])
       .join("text")
       .attr("class", "subtitle")
       .attr("font-size", 12)
       .attr("fill", "#4169E1")
       .attr("font-family", "chalkboard")
       .attr("text-anchor", "middle")
       .attr("x", svgWidth / 2)
       .attr("y", 40)
       .text("️🔎 Brush over from left to right to explore historical trends...");
    // Add a listener to reposition text when the window resizes
    window.addEventListener("resize", () => {
        const updatedWidth = svg.node().getBoundingClientRect().width;
        svg.select(".title").attr("x", updatedWidth / 2);
    });

    const tips_show = (e, d, html) => {
        d3.select(".d3-tip")
          .style("display", "block")
          .style("position", "absolute")
          .style("top", `${e.pageY}px`)
          .style("left", `${e.pageX}px`)
          .html(html);

    }
    const tips_hide = () => {
        d3.select(".d3-tip").style("display", "none");

    }

    // area to draw
    const ChartArea = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

    const AxisYLeft = ChartArea.append("g");
    const AxisX = ChartArea.append("g").attr(
        "transform",
        `translate(0,${innerH})`
    );

    ChartArea.selectAll(".x_label").data([0]).join("text").attr('class', 'x_label')
             .attr("transform", `translate(${innerW / 2},${innerH + 30})`)
             .text("Founded Year")
             .attr('font-size', 12)
             .attr('fill', '#000182');

    // y1 label
    ChartArea.selectAll(".y_label").data([0]).join("text").attr('class', 'y_label')
             .attr("transform", ` translate(10,0) rotate(90)`)
             .text("Number of Companies")
             .attr("font-size", 14)
             .attr("x", 60)
             .attr("y", 0)

             .attr("font-style", "italic")
             .attr("fill", "#000182");

    const x = d3.scaleTime().domain(d3.extent(chart_data, d => d[0])).range([0, innerW])
    const y = d3.scaleLinear().domain([0, d3.max(chart_data, d => d[1])]).range([innerH, 0])

    //    axis
    AxisX.call(d3.axisBottom(x));
    AxisYLeft.call(d3.axisLeft(y))

    let line = d3
        .line()
        .x((d) => x(d[0]))
        .y((d) => y(d[1]));

    ChartArea.append("path")
             .datum(chart_data)
             .attr("d", line)
             .attr("stroke", "#000182")
             .attr("stroke-width", 1.2)
             .attr("stroke-dasharray", "1")
             .attr("fill", "none")

    let circles =
        ChartArea.selectAll('circles').data(chart_data).join('circle').attr('class', 'circles')

    circles.raise().attr('r', 4).attr('cx', d => x(d[0]))
           .attr('cy', d => y(d[1])).attr('fill', '#CE9B01')
           .attr('stroke', '#000182').attr('stroke-width', .5)

    circles.on('mouseover', (e, d) => {
        let html = ` <p> ${d[0]}: ${d[1]} companies founded</p>`
        tips_show(e, d, html)
    }).on('mouseout', tips_hide)

    const brush = d3.brushX()
                    .extent([[0, 0], [innerW, innerH]])
                    .on("end", brushed);

    svg.append("g")
       .attr("class", "brush")
       .attr("transform", `translate(${margin.left},${margin.top})`)
       .call(brush);

    function brushed({selection}) {
        if (!selection) {
            let {render_bar, render_line, treemap, draw_map} = charts_funcs

            render_bar([sp_data, values[1]], charts_funcs)
            draw_map([sp_data, values[1], values[2]], charts_funcs)
            treemap([sp_data, values[1]], charts_funcs)
        } else {
            const [x0, x1] = selection.map(x.invert);

            const filteredData = chart_data.filter(d => d[0] >= x0 && d[0] <= x1);

            let min = d3.min(filteredData, d => d[0])
            let max = d3.max(filteredData, d => d[0])
            let new_sp_data = sp_data.filter(d => d.founded >= min && d.founded <= max)
            let {render_bar, render_line, treemap, draw_map} = charts_funcs
            render_bar([new_sp_data, values[1]], charts_funcs)
            draw_map([new_sp_data, values[1], values[2]], charts_funcs)
            treemap([new_sp_data, values[1]], charts_funcs)
        }

    }
}




