define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by dantaeusb on 03/01/2017.
     */
    var distanceToNext = 480, initialOpacity = .4;
    /**
     * It's probably better to use d3 transition and stop
     */
    var ScrollDispatcher = (function () {
        function ScrollDispatcher(reasonDispatcher) {
            var _this = this;
            this.DOM = {
                content: null,
                scrollIcon: null,
                scrollIconDocument: null,
            };
            this.offset = 0;
            this.contentHeight = 0;
            this.DOM.content = d3.select("#content");
            this.DOM.scrollIcon = d3.select("#scroll-icon");
            this.DOM.scrollIconDocument = d3.select(this.DOM.scrollIcon.node().contentDocument);
            this.reasonDispatcher = reasonDispatcher;
            this.updateContentHeight();
            window.addEventListener("wheel", function (e) {
                _this.listner.call(_this, e);
            });
        }
        ScrollDispatcher.prototype.updateContentHeight = function () {
            this.contentHeight = parseInt(this.DOM.content.select(".content-wrapper").style("height"));
        };
        ScrollDispatcher.prototype.getContentHeight = function () {
            return this.contentHeight;
        };
        ScrollDispatcher.prototype.drawStateIcon = function (summaryOffset) {
            var passPercent = Math.abs(summaryOffset / distanceToNext);
            var opacityMultipier = Math.abs(1 - initialOpacity);
            if (passPercent < 0.33) {
                var opacity = initialOpacity + opacityMultipier * (passPercent / 0.33);
                this.DOM.scrollIconDocument.select("#scroll-arrow-3").attr("fill-opacity", opacity);
                this.DOM.scrollIconDocument.select("#scroll-arrow-2").attr("fill-opacity", initialOpacity);
                this.DOM.scrollIconDocument.select("#scroll-arrow-1").attr("fill-opacity", initialOpacity);
            }
            else if (passPercent > 0.33 && passPercent < 0.66) {
                var opacity = initialOpacity + opacityMultipier * ((passPercent - 0.33) / 0.33);
                this.DOM.scrollIconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
                this.DOM.scrollIconDocument.select("#scroll-arrow-2").attr("fill-opacity", opacity);
                this.DOM.scrollIconDocument.select("#scroll-arrow-1").attr("fill-opacity", initialOpacity);
            }
            else if (passPercent > 0.66 && passPercent < 1) {
                var opacity = initialOpacity + opacityMultipier * ((passPercent - 0.66) / 0.33);
                this.DOM.scrollIconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
                this.DOM.scrollIconDocument.select("#scroll-arrow-2").attr("fill-opacity", 1);
                this.DOM.scrollIconDocument.select("#scroll-arrow-1").attr("fill-opacity", opacity);
            }
            else if (passPercent > 1) {
                var opacity = initialOpacity + opacityMultipier * ((passPercent - 0.66) / 0.33);
                this.DOM.scrollIconDocument.select("#scroll-arrow-3").attr("fill-opacity", 1);
                this.DOM.scrollIconDocument.select("#scroll-arrow-2").attr("fill-opacity", 1);
                this.DOM.scrollIconDocument.select("#scroll-arrow-1").attr("fill-opacity", 1);
            }
        };
        ScrollDispatcher.prototype.getCurrentReason = function () {
            return this.DOM.content.select(".reason");
        };
        ScrollDispatcher.prototype.listner = function (e) {
            var _self = this;
            this.offset += e.deltaY;
            var scrollY = 0;
            var overScrollY = 0;
            var maxScroll = this.getContentHeight() - window.innerHeight;
            if (maxScroll < 0) {
                maxScroll = 0;
            }
            if (this.offset < 0) {
                scrollY = 0;
                overScrollY = 0;
            }
            else if (this.offset > maxScroll) {
                scrollY = -maxScroll;
                overScrollY = -(this.offset - maxScroll);
            }
            else {
                scrollY = -this.offset;
                overScrollY = 0;
            }
            var reason = this.getCurrentReason();
            this.getCurrentReason().style("margin-top", scrollY + "px");
            if (overScrollY != 0) {
                reason
                    .interrupt("bounce")
                    .style("transform", "translateY(" + overScrollY + "px)");
                reason
                    .transition("bounce")
                    .ease(d3.easeLinear)
                    .delay(10)
                    .duration(500)
                    .styleTween("transform", function () {
                    var transformMatrix = reason.style("transform");
                    transformMatrix = transformMatrix.replace(/^\w+\(/, "[").replace(/\)$/, "]");
                    var startValue = JSON.parse(transformMatrix)[5];
                    var doubt = overScrollY - startValue;
                    return function (t) {
                        var newValue = startValue * Math.pow(1 - t, 2) + doubt * Math.pow(1 - t, 2);
                        if (newValue > 0) {
                            newValue = 0;
                        }
                        _self.drawStateIcon(newValue);
                        _self.setOffset(maxScroll - newValue);
                        return "translateY(" + newValue + "px)";
                    };
                })
                    .on("end", function () {
                    _self.setOffset(maxScroll);
                    overScrollY = 0;
                });
            }
            else {
                this.drawStateIcon(0);
                reason
                    .interrupt("bounce")
                    .style("transform", "translateY(0px)");
            }
        };
        ScrollDispatcher.prototype.setOffset = function (offset) {
            this.offset = offset;
            var maxScroll = this.getContentHeight() - window.innerHeight;
            if (offset > maxScroll + distanceToNext) {
                this.reasonDispatcher.showNextReason();
            }
        };
        ScrollDispatcher.prototype.getOffset = function () {
            return this.offset;
        };
        return ScrollDispatcher;
    }());
    exports.ScrollDispatcher = ScrollDispatcher;
});
//# sourceMappingURL=scrollDispatcher.js.map