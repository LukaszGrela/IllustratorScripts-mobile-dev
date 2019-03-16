/**
 * Exports selected artboard as PNG's for iOS
 */
/*
 #target Illustrator
 */
(function() {
    if (app.documents.length == 0) {
        alert('Open a document containing some artboards to export before running this script');
        return;
    }

    var mdpi = 'mdpi_';
    
    var saveAsPng24 = function(document, filePath, scaleTo) {
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
    var saveToRes = function(document, scaleTo, preffix, densitySuffix, folderName, lowerCase) {
        var i, ab;
        i = document.artboards.getActiveArtboardIndex();

        ab = document.artboards[i];
        var abName = ab.name;
        //
        if (confirm('Do you want to export ' + abName + ' artboard?')) {

            // clean out of density prefix
            abName = abName.split(mdpi).join('');
            //
            var folder = Folder.selectDialog();
            var documentName = document.name.replace('.ai', '');

            var myFolder = new Folder(folder.absoluteURI + '/' + documentName + folderName);
            if (!myFolder.exists) myFolder.create();
            //
            var fileName = preffix + abName + densitySuffix;

            if (lowerCase) {
                fileName = fileName.toLowerCase();
            }
            // save
            saveAsPng24(document, myFolder.fsName + '/' + fileName + '.png', scaleTo);
            saveAsPng24(document, myFolder.fsName + '/' + fileName + '@2x.png', scaleTo * 2);
            saveAsPng24(document, myFolder.fsName + '/' + fileName + '@3x.png', scaleTo * 3);
        }
    };
    //application
    var document = app.activeDocument;
    if (document) {
        saveToRes(document, 100, '', '', '/ios', true);
    }
})();
