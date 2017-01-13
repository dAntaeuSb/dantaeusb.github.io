/**
 * Created by dantaeusb on 12/01/2017.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Author = (function () {
        function Author() {
            this.DOM = {
                wrapper: null,
                name: null,
                avatar: null,
                uri: null
            };
            this.DOM.wrapper = d3.select("#author-placeholder");
            this.DOM.name = this.DOM.wrapper.select(".author-identity").select(".author-name");
            this.DOM.avatar = this.DOM.wrapper.select(".author-avatar").select("img");
        }
        Author.prototype.hide = function () {
        };
        Author.prototype.show = function () {
        };
        Author.prototype.getIsHidden = function () {
            return this.isHidden;
        };
        Author.prototype.update = function (model) {
            if (!this.isHidden) {
                this.hide();
            }
            this.updateModel(model);
            this;
        };
        Author.prototype.updateModel = function (model) {
            this.name = model.name;
            this.avatar = model.avatarUri;
            this.uri = model.uri;
        };
        return Author;
    }());
    exports.Author = Author;
});
//# sourceMappingURL=author.js.map