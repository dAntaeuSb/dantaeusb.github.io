define(["require", "exports", "app/logo", "reasons/dispatcher", "app/bgvideo"], function (require, exports, logo_1, dispatcher_1, bgvideo_1) {
    "use strict";
    var logo = new logo_1.Logo("#header-logo-x", "#header-logo-x-object");
    var reasonDispatcher = new dispatcher_1.ReasonDispatcher();
    logo.startLoading();
    setTimeout(function () {
        logo.setLoadProgress(.6);
        setTimeout(function () {
            logo.stopLoading();
        }, 1000);
    }, 1000);
    var bgVideo = new bgvideo_1.BackgroundVideo("/public/videos/iamxbg.mp4");
});
//# sourceMappingURL=reasons.js.map