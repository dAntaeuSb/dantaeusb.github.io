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
            var contentHeight = parseInt(content.select(".inner-wrapper").style("height"));
            window.addEventListener("wheel", function (e) {
                if (summaryOffset != 0) {
                    summaryOffset -= e.deltaY;
                }
                if (content.node().scrollTop >= (contentHeight - window.innerHeight)) {
                    if (summaryOffset == 0) {
                        summaryOffset = e.deltaY;
                    }
                    if (bounceIntervalId === false) {
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
                                alert("next");
                            }
                            d3.select("#content .reason").style("transform", "translateY(" + summaryOffset + "px)");
                            summaryOffset = Math.round(summaryOffset / 2);
                            if (summaryOffset >= -1) {
                                summaryOffset = 0;
                                clearInterval(bounceIntervalId);
                                bounceIntervalId = false;
                                d3.select("#content .reason").style("transform", "translateY(0px)");
                            }
                        }, 100);
                    }
                }
            });
        })();
    });
    d3.select(".image-attachment").on("click", function (e) {
        d3.select("#bg-video").node().pause();
        d3.select("#overlay-1").style("display", "block");
    });
    d3.select("#overlay-1").select(".overlay-close").on("click", function (e) {
        d3.select("#bg-video").node().play();
        d3.select("#overlay-1").style("display", "none");
    });
    d3.select(".reason").select(".comments").on("click", function (e) {
        d3.select("#bg-video").node().pause();
        d3.select("#overlay-2").style("display", "block");
    });
    d3.select("#overlay-2").select(".overlay-close").on("click", function (e) {
        d3.select("#bg-video").node().play();
        d3.select("#overlay-2").style("display", "none");
    });
});
//# sourceMappingURL=scroll.js.map