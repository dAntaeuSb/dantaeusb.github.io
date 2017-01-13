/**
 * Created by dantaeusb on 12/01/2017.
 */
import {Logo} from "app/logo"
import {ReasonDispatcher} from "reasons/dispatcher"
import {ScrollDispatcher} from "reasons/scrollDispatcher"
import {BackgroundVideo} from "app/bgvideo"

var logo = new Logo("#header-logo-x", "#header-logo-x-object");
var reasonDispatcher = new ReasonDispatcher();

logo.startLoading();

setTimeout(() => {
    logo.setLoadProgress(.6);

    setTimeout(() => {
        logo.stopLoading()
    }, 1000)
}, 1000);

let bgVideo = new BackgroundVideo("/public/videos/iamxbg.mp4");