/**
 * Remixer 1: @herkulano (http://www.herkulano.com)
 * Remixer 2: @hotappsfactory (http://www.hotappsfactory.com)
 * Thanks to: Niels Bosma (niels.bosma@motorola.com)
 * Modified by Łukasz 'Severiaan' Grela on 2014/11/19
 */
/*
 #target Illustrator
 */
(function () {

    if (app.documents.length == 0) {
        alert("Open a document containing some artboards to export before running this script");
        return;
    }
    var saveAsPng24 = function (document, filePath, scaleTo) {
        //alert("saveAsPng24(document,"+filePath+")")
        var file = new File(filePath);
        var options = new ExportOptionsPNG24();
        options.antiAliasing = true;
        options.transparency = true;
        options.artBoardClipping = true;
        options.verticalScale = scaleTo || 100;
        options.horizontalScale = scaleTo || 100;
        //
        document.exportFile(file, ExportType.PNG24, options);
    };
    /**
     * Scale and export file suffixed by densitySuffix, in a specific folder named folderName
     */
    var saveToRes = function (document, scaleTo, preffix, densitySuffix, folderName, lowerCase) {
            var i, ab, file;

            var myFolder = new Folder(folder.absoluteURI + "/" + folderName);
            if (!myFolder.exists) myFolder.create();

            for (i = document.artboards.length - 1; i >= 0; i--) {
                document.artboards.setActiveArtboardIndex(i);
                ab = document.artboards[i];

                var fileName = preffix + ab.name + densitySuffix;

                if (lowerCase) {
                    fileName = fileName.toLowerCase();
                }
                // save
                saveAsPng24(document, myFolder.fsName + "/" + fileName + ".png", scaleTo);
            }
        }
    //application
    var folder = Folder.selectDialog();
    var document = app.activeDocument;
    var suffix;

    if (document && folder) {
        var documentName = document.name.replace(".ai", "");

        saveToRes(document, 100, "", "", documentName + "/PNG", true);
    }

})();