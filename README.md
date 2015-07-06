# IllustratorScripts-mobile-dev
Scripts to help with mobile design

## ArtboardCreation

### create_android_artboards.js

Android related script to create set of artboards in the "bucket" size (mdpi, hdpi, xhdpi, xxhdpi and xxxhdpi).
Script will ask first for the name for the set e.g. _ic_launcher_, you may not use any of the bucket prefixes (mdpi_, hdpi_, xhdpi_, xxhdpi_ and xxxhdpi_)

Then it asks for the pixel size at the base (mdpi) level in form of comma separated numbers for width and height e.g. _48x48_

If everything is OK you will see a set of new artboards created, placed below lowest existing artboard named as `[bucket]_[name]` e.g. _mdpi_ic_launcher_

**Note** Document must be saved prior to running this script

### export_artboards_for_android

Android related script to export artboards as PNG's. This script is to be used with conjunction with the _create_android_artboards.js_ as it uses the name convention applied by that script to create proper folder and name of the output file.
e.g. the artboard named _mdpi_ic_launcher_ will be exported to the _drawable-mdpi_ folder as _ic_launcher.png_ file.

#Installation
Copy the 'greladesign' folder into the _Scripts_ folder and if Illustrator was opened then restart it. Example paths are:
Illustrator CS5.1:
`C:\Program Files\Adobe\Adobe Illustrator CS5.1\Presets\en_GB\Scripts`

Illustrator CS6 64bit: 
`C:\Program Files\Adobe\Adobe Illustrator CS6 (64 Bit)\Presets\en_GB\Scripts`

