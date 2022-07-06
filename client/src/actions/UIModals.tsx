export const toggleSideBar = () => {
    return {
        type: "TOGGLE_SIDEBAR",
    }
}

export const showSideBar = () => {
    return {
        type: "SHOW_SIDEBAR",
    }
}

export const hideSideBar = () => {
    return {
        type: "HIDE_SIDEBAR",
    }
}


export const togglePanel = () => {
    return {
        type: "TOGGLE_PANEL",
    }
}

export const showPanel = () => {
    return {
        type: "SHOW_PANEL",
    }
}

export const hidePanel = () => {
    return {
        type: "HIDE_PANEL",
    }
}



//  command palette for files
export const openCommandPalette = () => {
    return {
        type: "OPEN_COMMAND_PALETTE",
    }
}

export const closeCommandPalette = () => {
    return {
        type: "CLOSE_COMMAND_PALETTE",
    }
}

// open command palette for execution commands




export const openAccountPopupMenu = () => {
    return {
        type: "OPEN_ACCOUNT_POPUP_MENU",
    }
}

export const closeAccountPopupMenu = () => {
    return {
        type: "CLOSE_ACCOUNT_POPUP_MENU",
    }
}

export const toggleAccountPopupMenu = () => {
    return {
        type: "TOGGLE_ACCOUNT_POPUP_MENU",
    }
}

export const showAccountPopupMenu = () => {
    return {
        type: "SHOW_ACCOUNT_POPUP_MENU",
    }
}

export const hideAccountPopupMenu = () => {
    return {
        type: "HIDE_ACCOUNT_POPUP_MENU",
    }
}



////// right click menu 

export const showRightClickMouseMenu = () => {
    return {
        type: "SHOW_RIGHT_CLICK_MOUSE_MENU",
    }
}

export const hideRightClickMouseMenu = () => {
    return {
        type: "HIDE_RIGHT_CLICK_MOUSE_MENU",
    }
}

export const setRightClickMouseMenuCoords = (data: any) => {
    return {
        type: "SET_RIGHT_CLICK_MOUSE_MENU_COORDS",
        payload: data
    }
}