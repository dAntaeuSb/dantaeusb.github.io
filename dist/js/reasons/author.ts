/**
 * Created by dantaeusb on 12/01/2017.
 */

export class Author {
    protected DOM = {
        wrapper: null,
        name: null,
        avatar: null,
        uri: null
    };
    protected name: string;
    protected avatar: string;
    protected isHidden: boolean;
    protected uri: string;

    constructor() {
        this.DOM.wrapper = d3.select("#author-placeholder");
        this.DOM.name = this.DOM.wrapper.select(".author-identity").select(".author-name");
        this.DOM.avatar = this.DOM.wrapper.select(".author-avatar").select("img");
    }

    public hide() {

    }

    public show() {

    }

    public getIsHidden() {
        return this.isHidden;
    }

    public update(model) {
        if (!this.isHidden) {
            this.hide();
        }

        this.updateModel(model);

        this
    }

    protected updateModel(model) {
        this.name = model.name;
        this.avatar = model.avatarUri;
        this.uri = model.uri;
    }
}