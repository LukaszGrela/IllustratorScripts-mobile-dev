/*
 * Creates artboards at the bucket ratios starting at mdpi desired pixel size
 * @author Łukasz 'Severiaan' Grela
 * @created	    2014/12/03
 * @modified	2015/06/09
 * @version     1.1
 */
/*
 #target Illustrator
 */
(function() {
    var densities = ["mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"];
    var ratios = [1, 1.5, 2, 3, 4];
    var getSizeReg = /^\s*(\d+)\s*(?:,|x|X)\s*(\d+)\s*$/gm;
    var prefixTester = /^(m|h|xh|xxh|xxxh)dpi_/gm;

    var document = app.activeDocument;
    var artboards = document.artboards;
    /**
     * Parses the input string and returns object with width and height properties
     * @param {String} sizeStr
     * @returns {object}
     */
    var parseSize = function(sizeStr) {

        var w = sizeStr.replace(getSizeReg, "$1");
        var h = sizeStr.replace(getSizeReg, "$2");
        return {
            width: parseInt(w) || 0,
            height: parseInt(h) || 0
        };
    };
    /**
     * Returns "illustrator" friendly rect object that can be used in the add method to create new artboard
     * @see http://greladesign.com/blog/2014/12/03/add-artboard-with-javascript-in-illustrator-cs5-1/
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @returns {Array}
     */
    var newRect = function(x, y, width, height) {
        var l = 0;
        var t = 1;
        var r = 2;
        var b = 3;

        var rect = [];

        rect[l] = x;
        rect[t] = -y;
        rect[r] = width + x;
        rect[b] = -(height - rect[t]);

        return rect;
    };


    /// application
    if (document !== null) {

        if (!document.saved) {
            alert("This script needs to modify your document. Please save it before running this script.", "create_android_artboards.js Warning");
            return;//finish
        }
        //INPUT
        var input, iName, iSize, name, pfx, mul, artboard;
        //get size and name
        iName = prompt("Give the artboards set name (e.g. ic_launcher), do not use following prefixes: (mdpi_, hdpi_, xhdpi_, xxhdpi_ or xxxhdpi_)", "");
        if (iName === null)
            return; //finish;
        if (iName.length === 0 || prefixTester.test(iName))
        {
            alert("Invalid name, empty or contains dimension prefix (mdpi_, hdpi_, xhdpi_, xxhdpi_ or xxxhdpi_) do not use it in name.", "create_android_artboards.js Error");
            return; //finish
        }
        input = prompt("Give the size of the base artboard (mdpi 1x) in form of width,height e.g. 48,48", "48,48");
        if (input === null)
            return; //finish;

        iSize = parseSize(input);
        if (iSize.width === 0 || iSize.height === 0) {
            alert("Invalid dimensions.", "create_android_artboards.js Error");
            return; //finish
        }




        var rect, point, maxB = 0, minL = 0, gapX = 20, gapY = 20;
        /// existing Rectangle instance
        var $rect = artboards[0].artboardRect;
        point = {
            x: 0,
            y: 0
        };
        /// get most bottom left position
        for (var i = 0; i < artboards.length; i++) {
            var _rect = artboards[i].artboardRect;
            var b = -_rect[3];
            var l = _rect[0];
            if (l <= point.x) {
                point.x = l;
            }
            if (b >= point.y)
            {
                point.y = b;
            }
        }

        rect = {
            x: point.x,
            y: point.y + gapY,
            width: 0,
            height: 0
        };


        /// create artboards
        for (var i = 0; i < densities.length; i++)
        {
            pfx = densities[i];
            mul = ratios[i];

            name = pfx + "_" + iName;

            rect.width = ((iSize.width * mul) | 0);
            rect.height = ((iSize.height * mul) | 0);
            //alert(name + " - " + size.width + "x" + size.height);

            artboard = artboards.add($rect);
            artboard.name = name;
            artboard.artboardRect = newRect(rect.x, rect.y, rect.width, rect.height);

            rect.x += rect.width + gapX;
        }

    } else {
        alert("Open document first", "create_android_artboards.js Warning");
    }

})();