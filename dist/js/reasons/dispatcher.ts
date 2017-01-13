/**
 * Created by dantaeusb on 12/01/2017.
 */
import {Author} from "./author";
import {ScrollDispatcher} from "./scrollDispatcher";

export class ReasonDispatcher {
    protected author: Author;
    protected scroll: ScrollDispatcher;

    protected DOM = {
        content: null,
    };

    protected reasonTemplate: string;
    protected currentReason;

    constructor() {
        this.DOM.content = d3.select("#content");

        this.author = new Author();
        this.scroll = new ScrollDispatcher(this);

        this.constructReasons();

        this.drawReason(this.getNextReasonModel(), (html) => {
            this.DOM.content.select(".content-wrapper").node().insertAdjacentHTML("beforeEnd", html);
        });
    }

    protected constructReasons() {
        d3.DOM.content.selectAll(".reason")
            .each(function() {

            });
    }

    protected getReasonTemplate(cb) {
        if (!!this.reasonTemplate) {
            cb(this.reasonTemplate);
        }

        d3.request("/public/templates/reason.ejs")
            .get((xhr: XMLHttpRequest) => {
                let template = xhr.responseText;
                this.reasonTemplate = template;

                cb(template);
            });

        return this;
    }

    public showNextReason() {
        //this.currentReason.
    }

    protected drawReason(model, cb) {
        this.getReasonTemplate((template) => {
            let html = ejs.render(template, model);
            cb(html);
        });
    }

    protected getNextReasonModel(id: number) {
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
        }
    }
}