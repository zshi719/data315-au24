import * as d3 from 'd3'

export function treemap(values, charts_funcs) {
    let sp_data = values[0]

    const div = d3.select(`#treemap`);

    div.selectAll("*").remove()
    const width = div.node().getBoundingClientRect().width * 0.9;
    const height = div.node().getBoundingClientRect().height * 0.9;
    // const margin = {left: 40, right: 50, top: 150, bottom: 50};
    // const innerW = width - margin.left - margin.right;
    // const innerH = height - margin.top - margin.bottom;
    const svg = div
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    const svgWidth = svg.node().getBoundingClientRect().width;

    // Set title text and position it in the center of the SVG, with extra vertical spacing
    svg.selectAll(".title")
       .data([0])
       .join("text")
        // .attr("class", "title")
       .attr("font-size", 18)
       .attr("fill", "#000182")
       .attr("font-weight", "bold")
       .attr("font-family", "Lora")
       .attr("text-anchor", "middle") // Center the text anchor
       .attr("x", svgWidth / 2)       // Horizontally center text
       .attr("y", 20)                 // Set vertical position with more space
       .text("Sector and Sub-industry Treemap");

    svg.selectAll(".subtitle")
       .data([0])
       .join("text")
       .attr("font-size", 12)
       .attr("fill", "#4169E1")
       .attr("font-family", "chalkboard")
       .attr("text-anchor", "middle")
       .attr("x", svgWidth / 2)
       .attr("y", 40)
       .text("Solid dot: Sector, Hollow dot: Sub-industry");

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
    };

    // Prepare data structure for tree layout
    let chart_data = d3.rollup(sp_data, d => d3.sum(d, v => +v["market_cap_price"]), d => d["sector"],
                               d => d["sub_industry"]);
    const radius = Math.min(width, height) / 2.4;
    const tree = d3.tree().size([2 * Math.PI, radius]);
    const root = tree(d3.hierarchy(chart_data));

    // Area to draw
    const ChartArea = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 1.8})`);

    // Draw links
    ChartArea.append("g")
             .attr("fill", "none")
             .attr("stroke", "#050058")
             .attr("stroke-opacity", 0.4)
             .attr("stroke-width", .7)
             .selectAll()
             .data(root.links())
             .join("path")
             .attr("d", d3.linkRadial()
                          .angle(d => d.x)
                          .radius(d => d.y));

    // Append nodes
    let circles = ChartArea.append("g")
                           .selectAll()
                           .data(root.descendants())
                           .join("circle")
                           .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
                           .attr("fill", d => d.children ? "#CE9B01" : 'none')
                           .attr("stroke", "#CE9B01")
                           .attr("stroke-opacity", 0.8)
                           .attr("stroke-width", 1)
                           .attr("r", 3);

    // Append labels
    ChartArea.append("g")
             .attr("stroke-linejoin", "round")
             .attr("stroke-width", 3)
             .selectAll()
             .data(root.descendants())
             .join("text")
             .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
             .attr("dy", "0.31em")
             .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
             .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
             .attr("paint-order", "stroke")
             .attr("stroke", "white")
             .attr("fill", "currentColor")
             .text(d => d.data.name);

    circles.on('mouseover', (e, d) => {
        let html = `<p>${d.data[0]}</p>`;
        tips_show(e, d, html);
    })
           .on('mouseout', tips_hide);

    circles.on('click', (e, d) => {
        let new_sp_data = sp_data.filter(v => v.sector.includes(d.data[0]));
        let {render_bar, render_line, treemap, draw_map} = charts_funcs;
        render_bar([new_sp_data, values[1]], charts_funcs);
        draw_map([new_sp_data, values[1], , values[2]], charts_funcs);
        render_line([new_sp_data, values[1]], charts_funcs);
    })
           .on('dblclick', (e, d) => {
               let {render_bar, render_line, treemap, draw_map} = charts_funcs;
               render_bar(values, charts_funcs);
               draw_map(values, charts_funcs);
               render_line(values, charts_funcs);
           });

    // Area to draw
    // const ChartArea = svg
    //     .append("g")
    //     .attr("transform", `translate(${width / 2},${height / 1.8})`);

    // Draw links
    // ChartArea.append("g")
    //          .attr("fill", "none")
    //          .attr("stroke", "#050058")
    //          .attr("stroke-opacity", 0.4)
    //          .attr("stroke-width", .7)
    //          .selectAll()
    //          .data(root.links())
    //          .join("path")
    //          .attr("d", d3.linkRadial()
    //                       .angle(d => d.x)
    //                       .radius(d => d.y));

    // ChartArea.append("g")
    //          .attr("stroke-linejoin", "round")
    //          .attr("stroke-width", 1)
    //          .selectAll()
    //          .data(root.descendants())
    //          .join("text")
    //          .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >=
    // Math.PI ? 180 : 0})`) .attr("dy", "0.31em") .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
    // .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end") .attr("paint-order", "stroke")
    // .attr("stroke", "white") .attr("fill", d => d.depth === 1 ? "#CE9B01" : "currentColor")  // Color sectors
    // differently .attr("font-size", d => d.depth === 1 ? 12 : 10)  // Larger font for sectors .text(d => d.depth ===
    // 1 ? `${d.data[0]}` : `${d.data[0]}`) .style("cursor", "pointer") .on("mouseover", (e, d) => { let html =
    // `<p>${d.data[0]} ${d.depth === 1 ? 'Sector' : ''}</p>`; tips_show(e, d, html); }) .on("mouseout", tips_hide);

    // // Append nodes
    // let circles = ChartArea.append("g")
    //                        .selectAll()
    //                        .data(root.descendants())
    //                        .join("circle")
    //                        .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
    //                        .attr("fill", d => d.children ? "#CE9B01" : 'none')
    //                        .attr("stroke", "#CE9B01")
    //                        .attr("stroke-opacity", 0.8)
    //                        .attr("stroke-width", 1)
    //                        .attr("r", 4);
    //
    // // Append labels
    // // ChartArea.append("g")
    // //          .attr("stroke-linejoin", "round")
    // //          .attr("stroke-width", 3)
    // //          .selectAll()
    // //          .data(root.descendants())
    // //          .join("text")
    // //          .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >=
    // // Math.PI ? 180 : 0})`) .attr("dy", "0.31em") .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
    // // .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end") .attr("paint-order", "stroke")
    // // .attr("stroke", "white") .attr("fill", "currentColor") .text(d => d.data.name);
    //
    // circles.on('mouseover', (e, d) => {
    //     let html = `<p>${d.data[0]}</p>`;
    //     tips_show(e, d, html);
    // })
    //        .on('mouseout', tips_hide);
    //
    // circles.on('click', (e, d) => {
    //     let new_sp_data = sp_data.filter(v => v.sector.includes(d.data[0]));
    //     let {render_bar, render_line, treemap, draw_map} = charts_funcs;
    //     render_bar([new_sp_data, values[1]], charts_funcs);
    //     draw_map([new_sp_data, values[1], , values[2]], charts_funcs);
    //     render_line([new_sp_data, values[1]], charts_funcs);
    // })
    //        .on('dblclick', (e, d) => {
    //            let {render_bar, render_line, treemap, draw_map} = charts_funcs;
    //            render_bar(values, charts_funcs);
    //            draw_map(values, charts_funcs);
    //            render_line(values, charts_funcs);
    //        });
}



