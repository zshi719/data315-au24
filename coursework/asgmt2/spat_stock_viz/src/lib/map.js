import * as d3 from 'd3'
import {legendColor} from 'd3-svg-legend';

function get_map_data(values) {
    let geocoord = values[1].features;
    let sp_data = [...values[0]]
    let city_geojson = values[2]
    let get_city = (state_str) => state_str.split(',')[0]
    let cities = d3.groups(sp_data, d => get_city(d["headquarters_location"])).map(d => d[0])
    let get_state = (state_str) => state_str.split(',')[1].trim()
    let cik_by_state = d3.rollups(sp_data, d => d3.sum(d, v => +v.market_cap_price), d => get_state(d.headquarters_location))

    geocoord.forEach((d) => {
        let state_value = cik_by_state.find(v => v[0] === d.properties.name)
        if (state_value) {
            d.market_cap_price = state_value[1]
        } else {
            d.market_cap_price = 0;
        }
    });

    let city_geojson_features = city_geojson?.features.filter(d => cities.includes(d.properties.city))

    city_geojson_features.forEach(d => {
        let city_value = sp_data.find(v => get_city(v.headquarters_location) === d.properties.city)
        // let state_value = cik_by_state.find(v => v[0] === d.properties.city)
        if (city_value) {
            d.market_cap_price = +city_value.market_cap_price
        } else {
            d.market_cap_price = 0;
        }
    })
    return {geocoord, sp_data, city_geojson_features}
}

function render_map({geocoord, sp_data, charts_funcs, city_geojson_features}) {
    const div = d3.select(`#map`);
    div.selectAll("*").remove()

    const width = div.node().getBoundingClientRect().width * 0.95;
    const height = div.node().getBoundingClientRect().height * 0.95;
    const margin = {left: 0, right: 0, top: 0, bottom: 0};
    const innerW = width - margin.left - margin.right;
    let map_obj = {
        "type": "FeatureCollection", features: geocoord
    }

    const svg = div
        .append("svg")
        .attr("width", width)
        .attr("height", height)

// Append main title
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", 20)
       .attr("text-anchor", "middle")
       .attr("font-weight", "bold")
       .attr("font-family", "Lora")
       .attr("fill", "#000182")
       .text("Market Capitalization by Corporate Headquarters (HQ)");

    const subtitle = svg.append("text")
                        .attr("x", width / 2)    // Aligns with the title's x-position
                        .attr("y", 30)       // Position it below the title
                        .attr("font-size", "12px")
                        .attr("font-family", "Lora")
                        .attr("fill", "#000182")
    subtitle.append("tspan")
            .attr("x", width / 3) // Align with the previous line
            .attr("dy", "1.2em")
            .text("Red circle ~ company HQ at city-level, radius ~ company market cap");

    subtitle.append("tspan")// Same x-position t
            .attr("x", width / 3) // o align with the previous line
            .attr("dy", "1.2em") // Spacing between lines
            .text("Blue gradient ~ market cap owned by all companies headquartered in that state");

    svg.append("text")
       .attr("x", 20)   // Same X position to align with the main title
       .attr("y", 50)   // Position below the title
       .attr("font-size", "12px")
       .attr("font-family", "Lora")
       .attr("fill", "#050508")
       .text(".");

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

    const ChartArea = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

    let proj = d3.geoAlbersUsa().fitSize([width, height], map_obj)
    let path = d3.geoPath().projection(proj);
    geocoord = geocoord.filter(d => d.properties.name !== "Virginia")

    let paths = ChartArea.selectAll('path').data(geocoord).join('path')

    const color_scale = d3.scaleLinear().domain(d3.extent(geocoord, d => d.market_cap_price))
                          .interpolate(d3.interpolateRgb)
                          .range([d3.rgb("#D9EAF5"), d3.rgb('#000182')])

    const colorLegend = legendColor().shape("rect").cells(6).scale(color_scale);

    paths.attr('d', path)
         .attr('stroke', '#CE9B01')
         .attr('id', d => d.properties.name)
         .attr('fill', d => color_scale(d.market_cap_price))

    let circles = ChartArea.selectAll('circles').data(city_geojson_features).attr('class', 'circles').join('circle')
    let market_price_range = d3.max(sp_data, d => +d.market_cap_price)
    let size_scale = d3.scaleSqrt().range([1, 20]).domain([0, market_price_range])

    circles.attr('cx', d => {
        const centroid = path.centroid(d);
        return !isNaN(centroid[0]) ? centroid[0] : 0;
    })
           .attr('cy', d => {
               const centroid = path.centroid(d);
               return !isNaN(centroid[1]) ? centroid[1] : 0;
           })
           .attr('r', d => {  // radius
               return size_scale(d.market_cap_price)
           })
           .attr('fill', '#783654').attr('opacity', 0.7)
           .attr('stroke', '#CE9B01')
           .attr('stroke-width', 0.5)

    circles.on('mouseover', (e, d) => {
        let html = `<p>${d.properties.city}: ${d3.format("(.1f")(d.market_cap_price)}</p>`
        tips_show(e, d, html)
    }).on('mouseout', tips_hide)

    paths.on('mouseover', (e, d) => {
        let html = `<p>${d.properties.name}: ${d3.format("(.1f")(d.market_cap_price)}trn $</p>`
        tips_show(e, d, html)
    })
         .on('mouseout', tips_hide)
    paths.on('click', (e, d) => {

        let new_sp_data = sp_data.filter(v => v["headquarters_location"].includes(d.properties.name))

        let {render_bar, render_line, treemap} = charts_funcs
        treemap([new_sp_data, geocoord], charts_funcs)
        render_bar([new_sp_data, geocoord], charts_funcs)
        render_line([new_sp_data, geocoord], charts_funcs)
    })
         .on('dblclick', (e, d) => {
             let {render_bar, render_line, treemap, draw_map} = charts_funcs
             treemap([sp_data, geocoord], charts_funcs)
             render_bar([sp_data, geocoord], charts_funcs)
             render_line([sp_data, geocoord], charts_funcs)
         });

    svg.append("g")
       .attr("class", "color-legend")
       .attr("transform", `translate(${innerW - 80}, 240)`)
       .call(colorLegend)
       .selectAll("text").attr("font-size", "9px").attr("color", "#000182");

    svg.append("text")
        // bottom right corner of the card
       .attr("x", innerW - 120)
       .attr("y", 230)
       .attr("font-size", "8")
       .attr("fill", "#000182")
       .attr("font-family", "Lora")
       .text("Total Market Cap (Trillion USD)");

// Function to add a hint box on the bottom-left of the map with text wrapping
    function addHintBox(svg) {
        const boxWidth = 180;          // Set fixed width for the box
        const boxHeight = 60;          // Adjust height if you want more space
        const padding = 5;            // Padding around the text within the box

        // Position the hint box above the bottom-left border
        const svgHeight = svg.attr("height");
        const svgWidth = svg.attr("width");
        const boxX = 1;               // X position from the left
        const boxY = svgHeight - boxHeight - 40; // Y position from the bottom, with some margin

        const hintGroup = svg.append("g")
                             .attr("class", "hint-box")
                             .attr("transform", `translate(${boxX}, ${boxY})`);

        hintGroup.append("rect")
                 .attr("width", boxWidth)
                 .attr("height", boxHeight)
                 .attr("fill", "#e0e0e0")
                 .attr("rx", 15)                // Rounded corners
                 .attr("ry", 15)
                 .attr("fill", "#F7F9FC")       // Light background color
                 .attr("stroke", "#A0A8C0")     // Subtle border color
                 .attr("stroke-width", 1.5)
                 .attr("opacity", 0.8);

        // Text for the hint, with manual line breaks for wrapping
        const hintText = "❓Hover over a state to see market cap. Double-click to reset.";

        // Split the text into lines and display each line separately
        const lines = wrapText(hintText, 28); // Adjust character limit per line as needed

        lines.forEach((line, index) => {
            hintGroup.append("text")
                     .attr("x", padding)
                     .attr("y", padding + 15 * (index + 1)) // 15px line height
                     .attr("font-size", "12px")
                     .attr("fill", "#000182")
                     .style("font-family", "Chalkboard")
                     .text(line);
        });
    }

    addHintBox(svg);

// Function to wrap text by splitting it into lines

    function wrapText(text, maxCharsPerLine) {
        const words = text.split(" ");
        const lines = [];
        let line = "";

        words.forEach((word) => {
            if ((line + word).length > maxCharsPerLine) {
                lines.push(line.trim());
                line = word + " ";
            } else {
                line += word + " ";
            }
        });
        lines.push(line.trim());
        return lines;
    }
}

export function draw_map(values, charts_funcs) {
    let {geocoord, sp_data, city_geojson_features} = get_map_data(values)
    render_map({geocoord, sp_data, charts_funcs, city_geojson_features})

}
