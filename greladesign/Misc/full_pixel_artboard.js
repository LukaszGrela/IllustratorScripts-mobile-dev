/**
 * Łukasz 'Severiaan' Grela on 2017/01/20
 */
if (app.documents.length == 0) {
    alert("Open a document containing some artboards to check for full pixel before running this script");
} else {

    var modified = fullPixelArtboard()
    redraw();
    alert("Done! Changed "+modified+" artboard(s).");
}

function fullPixelArtboard() {
    var i, j, ab, document = app.activeDocument;
    var count = 0;
    for (i = document.artboards.length - 1; i >= 0; i--) {
        document.artboards.setActiveArtboardIndex(i);
        ab = document.artboards[i];
        //[0 left, 1 top, 2 right, 3 bottom]
        var rect = ab.artboardRect;
        var copy = rect + ""
        for (j = rect.length - 1; j >= 0; j--) {
            rect[j] = Math.round(rect[j]);
        }
        if(copy !== rect + "") {
            count++;
            ab.artboardRect = rect;
        }
    }
    return count;
}
