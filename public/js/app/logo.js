define(["require", "exports"], function (require, exports) {
    "use strict";
    var hueStart = 15, hueRange = 30, brightnessStart = 45, brightnessRange = 25, saturationStart = 82, saturationRange = 10;
    var loadAnimationTime = 300, waitBeforeZoom = 1000;
    var Logo = (function () {
        function Logo(wrapper, selector) {
            this.loading = false;
            this.zoomTimeoutId = null;
            this.wrapper = d3.select(wrapper);
            this.dom = this.wrapper.select(selector);
            this.logoSvgDocument = d3.select(this.dom.node().contentDocument);
            this.randomFunction = d3.randomNormal(.5, .3);
            this.changeColorAuto();
        }
        Logo.prototype.getBoundedNormalRandom = function () {
            var num = this.randomFunction();
            if (num < 0) {
                return 0;
            }
            else if (num > 1) {
                return 1;
            }
            return num;
        };
        Logo.prototype.changeColorAuto = function () {
            var _this = this;
            var timeNext = 300 + Math.random() * 1000;
            var elements = this.logoSvgDocument.select("#main").selectAll(".x-logo-element");
            elements
                .transition()
                .duration(timeNext)
                .ease(d3.easeSin)
                .attr("fill", this.getNewColor());
            setTimeout(function () {
                _this.changeColorAuto.apply(_this);
            }, timeNext);
            return this;
        };
        Logo.prototype.startLoading = function () {
            var _this = this;
            this.loading = true;
            var overlay = this.logoSvgDocument.select("#overlay");
            overlay.attr("opacity", 1);
            this.setLoadProgress(.2);
            this.zoomTimeoutId = setTimeout(function () {
                _this.zoomLogo.apply(_this);
            }, waitBeforeZoom);
            return this;
        };
        Logo.prototype.setLoadProgress = function (percent, animate) {
            if (animate === void 0) { animate = true; }
            if (!this.loading) {
                console.warn("Logo do not display any loadings now");
                return;
            }
            var defCrop = this.logoSvgDocument.select("defs").select("#clip-shape").select("polygon");
            if (animate) {
                defCrop
                    .transition()
                    .duration(loadAnimationTime)
                    .attr("points", "0 0, 0 1, " + percent + " 1, " + percent + " 0");
            }
            else {
                defCrop
                    .attr("points", "0 0, 0 1, " + percent + " 1, " + percent + " 0");
            }
            return this;
        };
        Logo.prototype.stopLoading = function () {
            var _this = this;
            this.setLoadProgress(1);
            if (!isNaN(this.zoomTimeoutId)) {
                clearTimeout(this.zoomTimeoutId);
                this.zoomTimeoutId = null;
            }
            this.wrapper.classed("loading", false);
            var overlay = this.logoSvgDocument.select("#overlay");
            overlay
                .transition()
                .duration(loadAnimationTime)
                .attr("opacity", 0)
                .on("end", function () {
                _this.setLoadProgress(0);
                _this.loading = false;
            });
            return this;
        };
        Logo.prototype.zoomLogo = function () {
            if (isNaN(this.zoomTimeoutId)) {
                return this;
            }
            this.wrapper.classed("loading", true);
            this.zoomTimeoutId = null;
        };
        Logo.prototype.getNewColor = function () {
            var hue = parseInt(hueStart + this.getBoundedNormalRandom() * hueRange);
            var saturation = parseInt(saturationStart + this.getBoundedNormalRandom() * saturationRange);
            var brightness = parseInt(brightnessStart + this.getBoundedNormalRandom() * brightnessRange);
            return colorcolor("hsl(" + hue + ", " + saturation + "%, " + brightness + "%)", "hex");
        };
        return Logo;
    }());
    exports.Logo = Logo;
});
//# sourceMappingURL=logo.js.map