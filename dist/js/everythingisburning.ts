import {color} from "./node_modules/@types/d3/node_modules/@types/d3-color/index";
document.addEventListener("DOMContentLoaded", (e) => {
    let xElement = d3.select("#header-logo-x-object");

    let gaussianRandom = () => {
        return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
    };

    let getFireColor = () => {
        const
            hueMedian = 25,
            hueRange = 30,
            brightnessMedian = 65,
            brightnessRange = 25,
            saturationMedian = 82,
            saturationRange = 10;

        let hue = parseInt(hueMedian + gaussianRandom() * hueRange);
        let saturation = parseInt(saturationMedian + gaussianRandom() * saturationRange);
        let brightness = parseInt(brightnessMedian + gaussianRandom() * brightnessRange);

        return colorcolor(`hsl(${hue}, ${saturation}%, ${brightness}%)`, "hex");
    };

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