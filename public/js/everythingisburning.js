"use strict";
document.addEventListener("DOMContentLoaded", function (e) {
    var xElement = d3.select("#header-logo-x-object");
    var getFireColor = function () {
        var hueRange = 30, hueStart = 10, brightnessStart = 50, brightnessRange = 50, saturationStart = 77, saturationRange = 10;
        var hue = parseInt(hueStart + Math.random() * hueRange);
        var saturation = parseInt(saturationStart + Math.random() * saturationRange);
        var brightness = parseInt(brightnessStart + Math.random() * brightnessRange);
        console.log("hsl(" + hue + ", " + saturation + "%, " + brightness + "%)");
        console.log(colorcolor("hsl(" + hue + ", " + saturation + "%, " + brightness + "%)", "hex"));
        return colorcolor("hsl(" + hue + ", " + saturation + "%, " + brightness + "%)", "hex");
    };
    console.log('ok!');
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