// packages
import _ from "lodash";

// helpers
import { focusedEditorOpenFilesData } from "./misc";


export const removeTab = (el: Array<ISingleFileInFolderView>, openFiles: IOpenFiles, focusedEditor: number) => {

    // go back if there's no opened files
    if (openFiles.editors.length === 0) {
        return { change: false, data: openFiles, localStorageAction: "nothing" }
    }



    // handling multiple tabs
    const _focusedEditorOpenFilesData = focusedEditorOpenFilesData(openFiles, focusedEditor)
    var updatedFocusedEditorOpenFiles = _focusedEditorOpenFilesData.filter((function (item) {
        for (var tab of el) {
            if (tab.fileId === item.fileId) {
                return false
            }
        }
        return true
    }))


    // is this is untitled files, remove localStorage when closing the tab
    var newTempFilesData;
    if (window.localStorage.getItem("newTempFilesData")) {
        newTempFilesData = JSON.parse(window.localStorage.getItem("newTempFilesData")!)
    } else {
        newTempFilesData = {}
    }
    for (var tab of el) {
        delete newTempFilesData[tab.fileId]
    }
    window.localStorage.setItem("newTempFilesData", JSON.stringify(newTempFilesData)!)

    ////////////////////////////////////////////////////////////////////////////////////////
    // 1) there's no file when we close current file (1 file in the focused editor) 
    if (updatedFocusedEditorOpenFiles.length === 0) {
        return { change: true, data: { editors: [], metadata: {} }, localStorageAction: "remove" }
    } else {
        // 2) settings focused=true on the first file (VSCode does it based on the history of focusing files, that's for later maybe)
        // settings all files focused to false
        updatedFocusedEditorOpenFiles = updatedFocusedEditorOpenFiles.map((q: any) => {
            return { ...q, focused: false }
        })
        // focused=true to first file
        updatedFocusedEditorOpenFiles[0].focused = true

        var updatedSingleEditorData = {
            editorId: focusedEditor, data: [...updatedFocusedEditorOpenFiles]
        }
        var allEditorsData = _.cloneDeep(openFiles.editors)
        allEditorsData[focusedEditor] = updatedSingleEditorData
        var a = { editors: [...allEditorsData], metadata: {} }
        a = _.cloneDeep(a)
        return { change: true, data: a, localStorageAction: "set" }
    }
}

