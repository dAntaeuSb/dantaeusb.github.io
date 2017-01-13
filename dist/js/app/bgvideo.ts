/**
 * Created by dantaeusb on 12/01/2017.
 */

export class BackgroundVideo {
    protected DOM;
    protected videoElement;

    constructor(videoUri) {
        this.DOM = d3.select("#bg-wrapper");
        this.videoElement =
            this.DOM.append("video")
                .attr("autoplay", true)
                .attr("muted", true)
                .attr("loop", true)
                .attr("id", "bg-video");

        this.videoElement
            .append("source")
                .attr("src", videoUri)
                .attr("type", "video/mp4");

        this.videoElement.on("play", () => {
        })
    }
}