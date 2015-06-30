# IllustratorScripts-mobile-dev
Scripts to help with mobile design

## ArtboardCreation

### create_android_artboards.js

Android related script to create set of artboards in the "bucket" size (mdpi, hdpi, xhdpi, xxhdpi and xxxhdpi).
Script will ask first for the name for the set e.g. _ic_launcher_, you may not use any of the bucket prefixes (mdpi_, hdpi_, xhdpi_, xxhdpi_ and xxxhdpi_)

Then it asks for the pixel size at the base (mdpi) level in form of comma separated numbers for width and height e.g. _48x48_

If everything is OK you will see a set of new artboards created, placed below lowest existing artboard named as `[bucket]_[name]` e.g. _mdpi_ic_launcher_

**Note** Document must be saved prior to runnign this script
