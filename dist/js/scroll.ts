/**
 * Created by dantaeusb on 03/01/2017.
 */

document.addEventListener("DOMContentLoaded", (e) => {
    let icon = d3.select("#scroll-icon");
    const distanceToNext = 480;
    const defaultArrowOpacity = .4;

    icon.on("load", (e) => {
        let iconDocument = d3.select(icon.node().contentDocument);

        (() => {
            let content = d3.select("#content");
            let summaryOffset = 0;
            let bounceIntervalId: any = false;

            window.addEventListener("wheel", (e) => {

                if (summaryOffset != 0) {
                    summaryOffset -= e.deltaY;
                }

                if (content.node().scrollTop >= (parseInt(content.style("height")) - window.innerHeight)) {
                    if (summaryOffset == 0) {
                        summaryOffset = e.deltaY;
                    }

                    if (bounceIntervalId === false) {
                        console.warn(bounceIntervalId);

                        bounceIntervalId = setInterval(() => {
                            let passPercent = Math.abs(summaryOffset / distanceToNext);
                            const opacityMultipier = Math.abs(1 - defaultArrowOpacity);

                            if (passPercent < 0.33) {
                                let opacity = defaultArrowOpacity + opacityMultipier * (passPercent / 0.33);
                                iconDocument.select("#scroll-arrow-3").attr("fill-opacity", opacity);
                                iconDocument.select("#scroll-arrow-2").attr("fill-opacity", defaultArrowOpacity);
                                iconDocument.select("#scroll-arrow-1").attr("fill-opacity", defaultArrowOpacity);
                            } else if (passPercent > 0.33 && passPercent < 0.66) {
                                let opacity = defaultArrowOpacity + opacityMultipier * ((passPercent - 0.33) / 0.33);
                                iconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
                                iconDocument.select("#scroll-arrow-2").attr("fill-opacity", opacity);
                                iconDocument.select("#scroll-arrow-1").attr("fill-opacity", defaultArrowOpacity);
                            } else if (passPercent > 0.66 && passPercent < 1) {
                                let opacity = defaultArrowOpacity + opacityMultipier * ((passPercent - 0.66) / 0.33);
                                iconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
                                iconDocument.select("#scroll-arrow-2").attr("fill-opacity", 1);
                                iconDocument.select("#scroll-arrow-1").attr("fill-opacity", opacity);
                            } else if (passPercent > 1) {
                                let opacity = defaultArrowOpacity + opacityMultipier * ((passPercent - 0.66) / 0.33);
                                iconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
                                iconDocument.select("#scroll-arrow-2").attr("fill-opacity", 1);
                                iconDocument.select("#scroll-arrow-1").attr("fill-opacity", 1);
                            }

                            d3.select("#content .reason").style("transform", `translateY(${summaryOffset}px)`);
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