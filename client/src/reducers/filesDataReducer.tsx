export const openFiles = (state: IOpenFiles = { editors: [], metadata: {} }, action: any) => {
    switch (action.type) {
        case "SET_OPEN_FILES":
            return action.payload
        default:
            return state
    }
}

export const focusedEditor = (state: number = 0, action: any) => {
    switch (action.type) {
        case "SET_FOCUSED_EDITOR":
            return action.payload
        default:
            return state
    }
}


export const filesData = (state: any = {}, action: any) => {
    switch (action.type) {
        case "SET_FILES_DATA":
            return action.payload
        default:
            return state
    }
}


export const dataLoaded = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "DATA_LOADED":
            return state = true
        default:
            return state
    }
}

export const workspaces = (state: any = {}, action: any) => {
    switch (action.type) {
        case "SET_WORKSPACES":
            return state
        default:
            return state
    }
}

// which item is "selected" in the panel (for styling, highlight and so on)
export const leftMenuActiveItem = (state: string = "explorer", action: any) => {
    switch (action.type) {
        case "SET_LEFT_MENU_ACTIVE_ITEM":
            return action.payload
        default:
            return state
    }
}

// data/folder structure
export const folderStructure = (state: any = {}, action: any) => {
    switch (action.type) {
        case "SET_FOLDER_STRUCTURE":
            return action.payload
        default:
            return state
    }
}