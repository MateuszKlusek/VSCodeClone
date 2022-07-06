import _ from "lodash"
import { v4 as uuidv4 } from "uuid"

export const changeTabs = (focusedEditor: number, tnNumber: number, openFiles: any) => {
    try {
        const focusedEditorOpenFiles = openFiles.editors[focusedEditor].data

        // handle if the index (tnNumber) is smaller or bigger than length of our tabs
        if (tnNumber < 0 || focusedEditorOpenFiles.length < tnNumber + 1) {
            return { changed: false, a: " " }
        }

        // if we can change tabs
        var updatedFocusedEditorOpenFiles = _.cloneDeep(focusedEditorOpenFiles)
        var focusedFileIdx: number = 0;
        for (var fileIdx in focusedEditorOpenFiles) {
            if (focusedEditorOpenFiles[fileIdx].focused) {
                focusedFileIdx = Number(fileIdx)
                break
            }
        }
        // change previous tab focused to false
        // change new tab focused to true
        updatedFocusedEditorOpenFiles[focusedFileIdx].focused = false
        updatedFocusedEditorOpenFiles[Number(tnNumber)].focused = true


        var updatedSingleEditorData = {
            editorId: focusedEditor, data: [...updatedFocusedEditorOpenFiles]
        }
        var allEditorsData = _.cloneDeep(openFiles.editors)
        allEditorsData[focusedEditor] = updatedSingleEditorData
        const a = { editors: [...allEditorsData], metadata: {} }

        return { changed: true, a: a }
    } catch (err) {
        return { changed: false, a: " " }
    }






    // if we want to travel to the tab that doesn't exist or 0th
    // if (tnNumber > openFiles[focusedEditor].length || tnNumber === 0) {
    //     return { changed: false, a: " " }
    // }
    // if (activeTabs[focusedEditor].idx !== tnNumber - 1) {
    //     var temp = activeTabs[focusedEditor]
    //     temp.idx = tnNumber - 1
    //     var a = activeTabs
    //     a[focusedEditor] = temp
    //     a = _.cloneDeep(a)
    //     return { changed: true, a: a }
    // }
    // else {
    // }
}


export const sleep = async (ms: number) => {
    await new Promise((r) => setTimeout(r, ms));
};

export const count = (word: any, char: any) => {
    var result = 0;
    for (var i = 0; i < word.length; i++) {
        if (word[i] === char) {
            result++;
        }
    }
    return result;
};


// insert el into an arr at specific position
export const insert = (arr: any, index: any, newItem: any) => [
    ...arr.slice(0, index),

    newItem,

    ...arr.slice(index)
];

export const focusedEditorOpenFilesData = (openFiles: IOpenFiles, focusedEditor: number) => {
    return openFiles.editors[focusedEditor].data
}

export const focusedEditorFocusedFileId = (openFiles: IOpenFiles, focusedEditor: number) => {
    const filesData = focusedEditorOpenFilesData(openFiles, focusedEditor)
    const [focusedFileData] = filesData.filter((n: any) => n.focused === true)
    return focusedFileData.fileId

}

export const generateUUIDWithoutDashed = () => {
    let myUuid = uuidv4()
    return myUuid.replaceAll("-", "")
}


export const updateFilesDataState = async (filesData: any, fileId: string, { ...args }: any) => {
    try {
        var focusedFileData = filesData[fileId]
        // parse through all the args one by one (no for loop)
        for (const prop in args) {
            focusedFileData[prop] = args[prop]
        }

        var _filesData = filesData
        _filesData[fileId] = focusedFileData
        _filesData = _.cloneDeep(_filesData)

        return { updatedFilesDataState: _filesData }
    } catch (err) {
        return { updatedFilesDataState: filesData }
    }
}




export const createNewFile = (openFiles: IOpenFiles, focusedEditor: number, filesData: IFilesData) => {
    // new files data
    var newFileId = generateUUIDWithoutDashed()
    var newFileData: IFilesDataInside = {
        mode: "normal",
        command: "",
        x: 95,
        y: 65,
        fileName: "Untitled-1",
        text: [""],
        tokenizedText: [[]],
        fileId: newFileId,
        filePath: "/",
        newFile: false
    }

    // get all the new files (unsaved) from localStorage, add this one and and save to localStorage
    var newTempFilesData;
    if (window.localStorage.getItem("newTempFilesData")) {
        newTempFilesData = JSON.parse(window.localStorage.getItem("newTempFilesData")!)
    } else {
        newTempFilesData = {}
    }
    newTempFilesData[newFileId] = newFileData
    window.localStorage.setItem("newTempFilesData", JSON.stringify(newTempFilesData)!)


    // add this data to filesData to right now (refresh is already handled)
    var _storageFilesData;
    if (window.localStorage.getItem("filesData")) {
        _filesData = JSON.parse(window.localStorage.getItem("filesData")!)
    } else {
        _filesData = {}
    }
    _filesData[newFileId] = newFileData
    window.localStorage.setItem("filesData", JSON.stringify(_filesData)!)





    var newOpenFileData: ISingleEditorEntry = {
        fileName: newFileData.fileName,
        fileId: newFileData.fileId,
        filePath: newFileData.filePath,
        focused: true
    }

    var newOpenFilesForFocusedEditors: Array<ISingleEditorEntry> = [];
    // handle empty openFiles state for focused editor
    if (openFiles.editors.length === 0) {
        newOpenFilesForFocusedEditors = [newOpenFileData]
    } else {
        var openFilesForFocusedEditors = openFiles.editors[focusedEditor].data
        for (var singleOpenFileIdx in openFilesForFocusedEditors) {
            if (openFilesForFocusedEditors[singleOpenFileIdx].focused) {
                newOpenFilesForFocusedEditors = insert(openFilesForFocusedEditors, singleOpenFileIdx + 1, newOpenFileData)
                newOpenFilesForFocusedEditors[Number(singleOpenFileIdx)].focused = false
                break
            }
        }
    }

    var updatedSingleEditorData: ISingleOpenEditor = {
        editorId: focusedEditor, data: [...newOpenFilesForFocusedEditors]
    }
    var allEditorsData = _.cloneDeep(openFiles.editors)
    allEditorsData[focusedEditor] = updatedSingleEditorData

    var _openFiles = { editors: [...allEditorsData], metadata: {} }

    // filesData
    var _filesData = filesData
    _filesData[newFileId] = newFileData
    _filesData = _.cloneDeep(_filesData)

    return { _openFiles, _filesData }

}