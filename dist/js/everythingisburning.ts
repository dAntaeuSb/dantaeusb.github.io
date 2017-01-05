import {color} from "./node_modules/@types/d3/node_modules/@types/d3-color/index";
document.addEventListener("DOMContentLoaded", (e) => {
    let xElement = d3.select("#header-logo-x-object");

    let getFireColor = () => {
        const
            hueRange = 30,
            hueStart = 10,
            brightnessStart = 50,
            brightnessRange = 50,
            saturationStart = 77,
            saturationRange = 10;

        let hue = parseInt(hueStart + Math.random() * hueRange);
        let saturation = parseInt(saturationStart + Math.random() * saturationRange);
        let brightness = parseInt(brightnessStart + Math.random() * brightnessRange);

        console.log(`hsl(${hue}, ${saturation}%, ${brightness}%)`);
        console.log(colorcolor(`hsl(${hue}, ${saturation}%, ${brightness}%)`, "hex"));

        return colorcolor(`hsl(${hue}, ${saturation}%, ${brightness}%)`, "hex");
    };

    console.log('ok!');
    xElement.on("load", (e) => {
        let contentDocument = xElement.node().contentDocument;
        let xSvg = d3.select(contentDocument);

        console.log(xSvg.selectAll(".x-logo-element"));

        let elements = xSvg.selectAll(".x-logo-element");

        let changeColor = () => {
            let timeNext = 500 + Math.random() * 1500;

            elements
                .transition()
                .duration(timeNext)
                .ease(d3.easeSin)
                .attr("fill", getFireColor());

            setTimeout(changeColor, timeNext);
        };

        changeColor();
    });
});