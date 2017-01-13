const
    hueStart = 15,
    hueRange = 30,
    brightnessStart = 45,
    brightnessRange = 25,
    saturationStart = 82,
    saturationRange = 10;

const
    loadAnimationTime = 300,
    waitBeforeZoom = 1000;

export class Logo {
    protected wrapper;
    protected dom: d3.Selection<any, {}, null, undefined>;
    protected logoSvgDocument: d3.Selection<any, {}, null, undefined>;
    protected randomFunction;
    protected loading: boolean = false;
    protected zoomTimeoutId = null;

    constructor(wrapper, selector) {
        this.wrapper = d3.select(wrapper);
        this.dom = this.wrapper.select(selector);
        this.logoSvgDocument = d3.select(this.dom.node().contentDocument);
        this.randomFunction = d3.randomNormal(.5, .3);
        this.changeColorAuto();
    }

    protected getBoundedNormalRandom() {
        let num = this.randomFunction();

        if (num < 0) {
            return 0;
        } else if (num > 1) {
            return 1;
        }

        return num;
    }

    protected changeColorAuto() {
        let timeNext = 300 + Math.random() * 1000;
        let elements = this.logoSvgDocument.select("#main").selectAll(".x-logo-element");

        elements
            .transition()
            .duration(timeNext)
            .ease(d3.easeSin)
            .attr("fill", this.getNewColor());

        setTimeout(() => {
            this.changeColorAuto.apply(this);
        }, timeNext);

        return this;
    }

    public startLoading() {
        this.loading = true;

        let overlay = this.logoSvgDocument.select("#overlay");
        overlay.attr("opacity", 1);

        this.setLoadProgress(.2);

        this.zoomTimeoutId = setTimeout(() => {
            this.zoomLogo.apply(this);
        }, waitBeforeZoom);

        return this;
    }

    public setLoadProgress(percent: Number, animate: boolean = true) {
        if (!this.loading) {
            console.warn("Logo do not display any loadings now");
            return;
        }

        let defCrop = this.logoSvgDocument.select("defs").select("#clip-shape").select("polygon");

        if (animate) {
            defCrop
                .transition()
                .duration(loadAnimationTime)
                .attr("points", `0 0, 0 1, ${percent} 1, ${percent} 0`);
        } else {
            defCrop
                .attr("points", `0 0, 0 1, ${percent} 1, ${percent} 0`);
        }

        return this;
    }

    public stopLoading() {
        this.setLoadProgress(1);

        if (!isNaN(this.zoomTimeoutId)) {
            clearTimeout(this.zoomTimeoutId);
            this.zoomTimeoutId = null;
        }

        this.wrapper.classed("loading", false);

        let overlay = this.logoSvgDocument.select("#overlay");
        overlay
            .transition()
            .duration(loadAnimationTime)
            .attr("opacity", 0)
            .on("end", () => {
                this.setLoadProgress(0);
                this.loading = false;
            });


        return this;
    }

    protected zoomLogo() {
        if (isNaN(this.zoomTimeoutId)) {
            return this;
        }

        this.wrapper.classed("loading", true);

        this.zoomTimeoutId = null;
    }

    protected getNewColor() {
        let hue = parseInt(hueStart + this.getBoundedNormalRandom() * hueRange);
        let saturation = parseInt(saturationStart + this.getBoundedNormalRandom() * saturationRange);
        let brightness = parseInt(brightnessStart + this.getBoundedNormalRandom() * brightnessRange);

        return colorcolor(`hsl(${hue}, ${saturation}%, ${brightness}%)`, "hex");
    }
}