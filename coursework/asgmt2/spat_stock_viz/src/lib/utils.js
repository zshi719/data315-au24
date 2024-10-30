// util.js
export function wrapText(text, width) {
    text.each(function () {
        const textElement = d3.select(this);
        const words = textElement.text().split(/\s+/).reverse();
        let line = [];
        let lineNumber = 0;
        const lineHeight = 1.2;
        const y = textElement.attr("y");
        const dy = parseFloat(textElement.attr("dy") || 0);
        let tspan = textElement.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", `${dy}em`);

        let word;
        while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = textElement.append("tspan")
                                   .attr("x", 0)
                                   .attr("y", y)
                                   .attr("dy", `${++lineNumber * lineHeight}em`)
                                   .text(word);
            }
        }
    });
}

export function addHintBox(svg, hintText) {
    const boxWidth = 180;
    const boxHeight = 80;
    const padding = 5;

    const svgHeight = svg.attr("height");
    const boxX = 20;
    const boxY = svgHeight - boxHeight - 30;

    const hintGroup = svg.append("g").attr("class", "hint-box").attr("transform", `translate(${boxX}, ${boxY})`);

    hintGroup.append("rect")
             .attr("width", boxWidth)
             .attr("height", boxHeight)
             .attr("fill", "#e0e0e0")
             .attr("rx", 10)
             .attr("ry", 10)
             .attr("stroke", "#555")
             .attr("stroke-width", 1)
             .attr("opacity", 0.9);

    hintGroup.append("text")
             .attr("x", padding)
             .attr("y", padding + 15)
             .attr("font-size", "10px")
             .attr("font-family", "Lora")
             .attr("fill", "#000182")
             .text(hintText)
             .call(wrapText, boxWidth - 2 * padding);
}
