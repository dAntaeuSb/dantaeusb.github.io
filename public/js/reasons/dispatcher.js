define(["require", "exports", "./author", "./scrollDispatcher"], function (require, exports, author_1, scrollDispatcher_1) {
    "use strict";
    var ReasonDispatcher = (function () {
        function ReasonDispatcher() {
            var _this = this;
            this.DOM = {
                content: null,
            };
            this.DOM.content = d3.select("#content");
            this.author = new author_1.Author();
            this.scroll = new scrollDispatcher_1.ScrollDispatcher(this);
            this.constructReasons();
            this.drawReason(this.getNextReasonModel(), function (html) {
                _this.DOM.content.select(".content-wrapper").node().insertAdjacentHTML("beforeEnd", html);
            });
        }
        ReasonDispatcher.prototype.constructReasons = function () {
            d3.DOM.content.selectAll(".reason")
                .each(function () {
            });
        };
        ReasonDispatcher.prototype.getReasonTemplate = function (cb) {
            var _this = this;
            if (!!this.reasonTemplate) {
                cb(this.reasonTemplate);
            }
            d3.request("/public/templates/reason.ejs")
                .get(function (xhr) {
                var template = xhr.responseText;
                _this.reasonTemplate = template;
                cb(template);
            });
            return this;
        };
        ReasonDispatcher.prototype.showNextReason = function () {
            //this.currentReason.
        };
        ReasonDispatcher.prototype.drawReason = function (model, cb) {
            this.getReasonTemplate(function (template) {
                var html = ejs.render(template, model);
                cb(html);
            });
        };
        ReasonDispatcher.prototype.getNextReasonModel = function (id) {
            return {
                reason: {
                    id: id,
                    header: "Inspiration for creativity",
                    contents: [
                        {
                            type: "text",
                            content: "<p>You’re an endless stream of inspiration for creativity</p>" +
                                "<p>IAMX is the music of my soul. This is what I need from day to day. I love Chris for his beautiful voice and his lyrics, which permeate into my heart, inspire and help me to live.</p>",
                        },
                        {
                            type: "image",
                            uri: "public/attachments/images/img1.jpg"
                        }
                    ],
                    views: 152
                }
            };
        };
        return ReasonDispatcher;
    }());
    exports.ReasonDispatcher = ReasonDispatcher;
});
//# sourceMappingURL=dispatcher.js.map