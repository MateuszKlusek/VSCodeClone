export const setOpenFiles = (data: any) => {
    return {
        type: "SET_OPEN_FILES",
        payload: data
    }
}

export const setSidePanelMovePx = (data: any) => {
    return {
        type: "SET_SIDE_PANEL_MOVE_PX",
        payload: data
    }
}

export const setMovablePanelClicked = (data: any) => {
    return {
        type: "MOVEBLE_PANEL_CLICKED",
        payload: data
    }
}



export const setFolderStructure = (data: any) => {
    return {
        type: "SET_FOLDER_STRUCTURE",
        payload: data
    }
}



// MISC
export const setDataLoaded = (data: any) => {
    return {
        type: "DATA_LOADED",
        payload: data
    }
}





// SETTINGS
export const setSettings = (data: any) => {
    return {
        type: "SET_SETTINGS",
        payload: data
    }
}



// ALERT POPUPS
export const showAlert = (data: any) => {
    return {
        type: "SHOW_ALERT",
        payload: data
    }
}

export const hideAlert = () => {
    return {
        type: "HIDE_ALERT"
    }
}