"use strict";
document.addEventListener("DOMContentLoaded", function (e) {
    var xElement = d3.select("#header-logo-x-object");
    var gaussianRandom = function () {
        return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
    };
    var getFireColor = function () {
        var hueMedian = 25, hueRange = 30, brightnessMedian = 65, brightnessRange = 25, saturationMedian = 82, saturationRange = 10;
        var hue = parseInt(hueMedian + gaussianRandom() * hueRange);
        var saturation = parseInt(saturationMedian + gaussianRandom() * saturationRange);
        var brightness = parseInt(brightnessMedian + gaussianRandom() * brightnessRange);
        return colorcolor("hsl(" + hue + ", " + saturation + "%, " + brightness + "%)", "hex");
    };
    xElement.on("load", function (e) {
        var contentDocument = xElement.node().contentDocument;
        var xSvg = d3.select(contentDocument);
        console.log(xSvg.selectAll(".x-logo-element"));
        var elements = xSvg.selectAll(".x-logo-element");
        var changeColor = function () {
            var timeNext = 500 + Math.random() * 1500;
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
//# sourceMappingURL=everythingisburning.js.map