var Liip = Liip || {};
Liip.resizer = (function ($) {
    var mainCanvas;

    /* 
     * Creates a new image object from the src
     * Uses the deferred pattern
     */
    var createImage = function (src) {
        var deferred = $.Deferred();
        var img = new Image();

        img.onload = function() {
            deferred.resolve(img);
        };
        img.src = src;
        return deferred.promise();
    };

    /* 
     * Create an Image, when loaded pass it on to the resizer
     */
    var startResize = function (inputId, outputId, size) {
        return $.when(
            createImage($('#'+inputId).attr('src'))
        ).then(resize(outputId, size));
    };

    /*
     * Draw the image object on a new canvas and half the size of the canvas
     * until the darget size has been reached
     * Afterwards put the base64 data into the target image
     */
    var resize = function(outputId, size){
        return function (image) {
            mainCanvas = document.createElement("canvas");
            mainCanvas.width = size.width;
            mainCanvas.height = size.height;
            var ctx = mainCanvas.getContext("2d");
            ctx.drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
            $('#' + outputId).attr('src', mainCanvas.toDataURL("image/jpeg"));
        };
    };

    return {
        resize: startResize
    };

})(jQuery);

