/*
 * Exports artboards as png's and saves in the bucket folders e.g. drawable-mdpi
 * @author £ukasz 'Severiaan' Grela
 * @created 	2015/06/09
 * @modified	2015/06/09
 * @version     0.11
 */
/*
 #target Illustrator
 */
(function(){
    if (app.documents.length == 0 )
    {
            alert("Open a document containing some artboards to export before running this script");
            return;
    }
    var extensionFinder = /(\.[^\.]*)$/;
    var prefixTester = /^(((m|h|xh|xxh|xxxh)dpi)_(.*))/gm;
    var document = app.activeDocument;
    var artboards = document.artboards;
    var documentName = document.name.replace(extensionFinder,"");
    //
    var saveAsPng24 = function(document, filePath) {
        //alert("saveAsPng24(document,"+filePath+")")
        var file = new File(filePath);
	var options = new ExportOptionsPNG24();
            options.antiAliasing = true;
            options.transparency = true;
            options.artBoardClipping = true;
            options.verticalScale = 100;
            options.horizontalScale = 100;
        //
        document.exportFile(file, ExportType.PNG24, options);
    };
    var saveInBucket = function(folder, artboard){
        var bucket = artboard.name.replace(prefixTester,"$2");
        var fileName = artboard.name.replace(prefixTester,"$4");
        var myFolder = new Folder(folder.absoluteURI + "/"
                + documentName + "/drawable-" + bucket);
        if (!myFolder.exists) myFolder.create();
        saveAsPng24(document, myFolder.fsName + "/" + fileName + ".png");
    };
    //



    //iterate over artboards, get name and test it;s prefix and save as PNG in appriopriate folder
    var i,ab,folder;

    folder = Folder.selectDialog();

    for (i = artboards.length - 1; i >= 0; i--) {
        artboards.setActiveArtboardIndex(i);
	ab = artboards[i];
        saveInBucket(folder, ab);
    }
})();

