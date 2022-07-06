// files icons
import javascript from './../assets/icons/javascript.png'
import css from './../assets/icons/css.png'
import react from './../assets/icons/react.png'
import python from './../assets/icons/python.png'
import jpg from './../assets/icons/jpg.png'
import webassembly from './../assets/icons/webassembly.png'
import json from './../assets/icons/json.png'
import folder from './../assets/icons/folder.png'
import emptyfile from "./../assets/icons/emptyfile.png"

export const filterFileIcon = (ext) => {
    if (ext.fileType === "folder") {
        return folder
    } else {



        var extension;
        try { extension = ext.fileName.split('.')[1] }
        catch (err) {
            extension = (ext[0].split("."))
            if (extension.length === 1) {
                extension = extension[0]
            } else {
                extension = extension[1]
            }
        }

        switch (extension) {
            case 'js':
                return javascript
            case 'jsx':
                return react
            case 'css':
                return css
            case 'jpg':
                return jpg
            case 'folder':
                return folder
            case 'json':
                return json
            case 'py':
                return python
            case 'wasm':
                return webassembly
            default:
                return emptyfile
        }
    }
}