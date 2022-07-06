export const saveOpenFilesToStorage = (idx) => {
    window.localStorage.setItem('openFiles', JSON.stringify(idx))
}

export const saveSidePanelMovedPxtoStorage = (idx) => {
    window.localStorage.setItem('sidePanelMovedPx', JSON.stringify(idx))
}

