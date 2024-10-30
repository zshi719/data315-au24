import * as d3 from 'd3'

// Market Capitalization by Sector Capital ($)
export function render_bar2(values, charts_funcs) {
    let sp_data = values[0]
    let x_dimension = "sector"

    const div = d3.select(`#bar2`);
    div.selectAll("*").remove()
    const width = div.node().getBoundingClientRect().width * .9;
    const height = div.node().getBoundingClientRect().height * .9;
    const margin = {left: 20, right: 50, top: 50, bottom: 40};
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    const svg = div
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    // area to draw
    const ChartArea = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

    const AxisYLeft = ChartArea.append("g");

    const AxisX = ChartArea.append("g").attr(
        "transform",
        `translate(0,${innerH})`
    );

    svg.selectAll(".title").data([0]).join("text").attr("transform", `translate(${10},${20})`)
       .attr('font-size', 11)
       .text("🔺Single-click to cross-filter. Double-click to reset.")
       .attr("font-family", "Proxima Nova")
       .attr("font-weight", "bold")
       .attr("fill", "#4169E1")
       .attr('class', 'title')

    //subtitel
    svg.selectAll(".sub_title").data([0]).join("text").attr("transform", `translate(${10},${40})`)
       .attr('font-size', 11)
       .text("🔺Hover over a bar for more details!")
       .attr("font-family", "Proxima Nova")
       .attr("font-weight", "bold")
       .attr("fill", "#4169E1")
       .attr('class', 'sub_title')

    svg.selectAll(".x_label").data([0]).join("text")
       .attr('class', 'x_label')
       .attr("transform", `translate(${120},${innerH + 90})`)
       .text("Market Cap (Trillion $)")
       .attr("font-size", 11)
       .attr("font-family", "Lora")
       .attr("fill", "#000182")

    let chart_data = d3.rollups(sp_data, d => d3.sum(d, v => +v["market_cap_price"]), d => d[x_dimension])
    chart_data.sort((a, b) => a[0].charCodeAt(0) > b[0].charCodeAt(0) ? 1 : -1)

    // scale
    const x_values = chart_data.map(d => d[0])
    const x = d3.scaleBand().domain(x_values).range([0, innerH]).padding(0.3)
    const y = d3.scaleLinear().domain([d3.max(chart_data, d => d[1]), 0]).range([innerH, 0])

    //    axis
    AxisX.call(d3.axisBottom(y).ticks(4));
    // AxisYLeft.call(d3.axisLeft(x))

    let rects = ChartArea.selectAll("rect")
                         .data(chart_data)
                         .join("rect")
                         .attr("class", (d) => d[0])
                         .attr("y", (d) => x(d[0]))
                         .attr("x", 0)
                         .attr("width", (d) => y(d[1]))
                         .attr("height", x.bandwidth())
                         .attr("fill", "#783654")
                         .attr("stroke", "#000182")
                         .attr("stroke-width", "1")

    //tip
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

    rects.on('mouseover', (e, d) => {
        let html = ` <p> ${d[0]} :${d3.format('.2f')(d[1])}  </p>`
        tips_show(e, d, html)
    })
         .on('mouseout', tips_hide)
    rects.on('click', (e, d) => {

        let new_sp_data = sp_data.filter(v => v.sector.includes(d[0]))
        let {render_bar, render_line, treemap, draw_map} = charts_funcs
        treemap([new_sp_data, values[1]], charts_funcs)
        draw_map([new_sp_data, values[1], values[2]], charts_funcs)
        render_line([new_sp_data, values[1]], charts_funcs)
    })
         .on('dblclick', (e, d) => {
             let {render_bar, render_line, treemap, draw_map} = charts_funcs
             treemap(values, charts_funcs)
             draw_map(values, charts_funcs)
             render_line(values, charts_funcs)
         });

}

