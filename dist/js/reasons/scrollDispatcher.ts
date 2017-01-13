import {ReasonDispatcher} from "./dispatcher";
/**
 * Created by dantaeusb on 03/01/2017.
 */

const
    distanceToNext = 480,
    initialOpacity = .4;

/**
 * It's probably better to use d3 transition and stop
 */
export class ScrollDispatcher {
    protected DOM = {
        content: null,
        scrollIcon: null,
        scrollIconDocument: null,
    };

    protected offset: number = 0;
    protected contentHeight: number = 0;
    protected reasonDispatcher: ReasonDispatcher;

    constructor(reasonDispatcher: ReasonDispatcher) {
        this.DOM.content = d3.select("#content");
        this.DOM.scrollIcon = d3.select("#scroll-icon");
        this.DOM.scrollIconDocument = d3.select(this.DOM.scrollIcon.node().contentDocument);
        this.reasonDispatcher = reasonDispatcher;
        this.updateContentHeight();

        window.addEventListener("wheel", (e) => {
            this.listner.call(this, e);
        });
    }

    public updateContentHeight() {
        this.contentHeight = parseInt(this.DOM.content.select(".content-wrapper").style("height"));
    }

    public getContentHeight(): number {
        return this.contentHeight;
    }

    public drawStateIcon(summaryOffset) {
        let passPercent = Math.abs(summaryOffset / distanceToNext);
        const opacityMultipier = Math.abs(1 - initialOpacity);

        if (passPercent < 0.33) {
            let opacity = initialOpacity + opacityMultipier * (passPercent / 0.33);
            this.DOM.scrollIconDocument.select("#scroll-arrow-3").attr("fill-opacity", opacity);
            this.DOM.scrollIconDocument.select("#scroll-arrow-2").attr("fill-opacity", initialOpacity);
            this.DOM.scrollIconDocument.select("#scroll-arrow-1").attr("fill-opacity", initialOpacity);
        } else if (passPercent > 0.33 && passPercent < 0.66) {
            let opacity = initialOpacity + opacityMultipier * ((passPercent - 0.33) / 0.33);
            this.DOM.scrollIconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
            this.DOM.scrollIconDocument.select("#scroll-arrow-2").attr("fill-opacity", opacity);
            this.DOM.scrollIconDocument.select("#scroll-arrow-1").attr("fill-opacity", initialOpacity);
        } else if (passPercent > 0.66 && passPercent < 1) {
            let opacity = initialOpacity + opacityMultipier * ((passPercent - 0.66) / 0.33);
            this.DOM.scrollIconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
            this.DOM.scrollIconDocument.select("#scroll-arrow-2").attr("fill-opacity", 1);
            this.DOM.scrollIconDocument.select("#scroll-arrow-1").attr("fill-opacity", opacity);
        } else if (passPercent > 1) {
            let opacity = initialOpacity + opacityMultipier * ((passPercent - 0.66) / 0.33);
            this.DOM.scrollIconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
            this.DOM.scrollIconDocument.select("#scroll-arrow-2").attr("fill-opacity", 1);
            this.DOM.scrollIconDocument.select("#scroll-arrow-1").attr("fill-opacity", 1);
        }
    }

    protected getCurrentReason() {
        return this.DOM.content.select(".reason");
    }

    protected listner(e: WheelEvent) {
        let _self = this;

        this.offset += e.deltaY;

        let scrollY = 0;
        let overScrollY = 0;
        let maxScroll = this.getContentHeight() - window.innerHeight;

        if (maxScroll < 0) {
            maxScroll = 0;
        }

        if (this.offset < 0) {
            scrollY = 0;
            overScrollY = 0;
        } else if (this.offset > maxScroll) {
            scrollY = -maxScroll;
            overScrollY = -(this.offset - maxScroll);
        } else {
            scrollY = -this.offset;
            overScrollY = 0;
        }

        let reason = this.getCurrentReason();
        this.getCurrentReason().style("margin-top", `${scrollY}px`);

        if (overScrollY != 0) {

            reason
                .interrupt("bounce")
                .style("transform", `translateY(${overScrollY}px)`);

            reason
                .transition("bounce")
                .ease(d3.easeLinear)
                .delay(10)
                .duration(500)
                .styleTween("transform", function () {
                    let transformMatrix = reason.style("transform");
                    transformMatrix = transformMatrix.replace(/^\w+\(/,"[").replace(/\)$/,"]");

                    let startValue = JSON.parse(transformMatrix)[5];
                    let doubt = overScrollY - startValue;

                    return(t) =>
                    {
                        let newValue = startValue * Math.pow(1 - t, 2) + doubt * Math.pow(1 - t, 2);

                        if (newValue > 0) {
                            newValue = 0;
                        }

                        _self.drawStateIcon(newValue);
                        _self.setOffset(maxScroll - newValue);

                        return `translateY(${newValue}px)`;
                    }
                })
                .on("end", () => {
                    _self.setOffset(maxScroll);
                    overScrollY = 0;
                });
        } else {
            this.drawStateIcon(0);

            reason
                .interrupt("bounce")
                .style("transform", "translateY(0px)");
        }
    }

    public setOffset(offset: number) {
        this.offset = offset;

        let maxScroll = this.getContentHeight() - window.innerHeight;

        if (offset > maxScroll + distanceToNext) {
            this.reasonDispatcher.showNextReason()
        }
    }

    public getOffset() {
        return this.offset;
    }
}