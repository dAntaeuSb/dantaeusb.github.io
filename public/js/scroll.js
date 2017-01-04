/**
 * Created by dantaeusb on 03/01/2017.
 */
document.addEventListener("DOMContentLoaded", function (e) {
    var icon = d3.select("#scroll-icon");
    var distanceToNext = 480;
    var defaultArrowOpacity = .4;
    icon.on("load", function (e) {
        var iconDocument = d3.select(icon.node().contentDocument);
        (function () {
            var content = d3.select("#content");
            var summaryOffset = 0;
            var bounceIntervalId = false;
            window.addEventListener("wheel", function (e) {
                if (summaryOffset != 0) {
                    summaryOffset -= e.deltaY;
                }
                if (content.node().scrollTop >= (parseInt(content.style("height")) - window.innerHeight)) {
                    if (summaryOffset == 0) {
                        summaryOffset = e.deltaY;
                    }
                    if (bounceIntervalId === false) {
                        console.warn(bounceIntervalId);
                        bounceIntervalId = setInterval(function () {
                            var passPercent = Math.abs(summaryOffset / distanceToNext);
                            var opacityMultipier = Math.abs(1 - defaultArrowOpacity);
                            if (passPercent < 0.33) {
                                var opacity = defaultArrowOpacity + opacityMultipier * (passPercent / 0.33);
                                iconDocument.select("#scroll-arrow-3").attr("fill-opacity", opacity);
                                iconDocument.select("#scroll-arrow-2").attr("fill-opacity", defaultArrowOpacity);
                                iconDocument.select("#scroll-arrow-1").attr("fill-opacity", defaultArrowOpacity);
                            }
                            else if (passPercent > 0.33 && passPercent < 0.66) {
                                var opacity = defaultArrowOpacity + opacityMultipier * ((passPercent - 0.33) / 0.33);
                                iconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
                                iconDocument.select("#scroll-arrow-2").attr("fill-opacity", opacity);
                                iconDocument.select("#scroll-arrow-1").attr("fill-opacity", defaultArrowOpacity);
                            }
                            else if (passPercent > 0.66 && passPercent < 1) {
                                var opacity = defaultArrowOpacity + opacityMultipier * ((passPercent - 0.66) / 0.33);
                                iconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
                                iconDocument.select("#scroll-arrow-2").attr("fill-opacity", 1);
                                iconDocument.select("#scroll-arrow-1").attr("fill-opacity", opacity);
                            }
                            else if (passPercent > 1) {
                                var opacity = defaultArrowOpacity + opacityMultipier * ((passPercent - 0.66) / 0.33);
                                iconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
                                iconDocument.select("#scroll-arrow-2").attr("fill-opacity", 1);
                                iconDocument.select("#scroll-arrow-1").attr("fill-opacity", 1);
                            }
                            d3.select("#content .reason").style("transform", "translateY(" + summaryOffset + "px)");
                            summaryOffset = Math.round(summaryOffset / 2);
                            if (Math.abs(summaryOffset) <= 1) {
                                console.log(summaryOffset + "end " + bounceIntervalId);
                                summaryOffset = 0;
                                clearInterval(bounceIntervalId);
                                bounceIntervalId = false;
                                d3.select("#content .reason").style("transform", false);
                            }
                        }, 100);
                        console.warn(bounceIntervalId);
                    }
                }
            });
        })();
    });
});
//# sourceMappingURL=scroll.js.map