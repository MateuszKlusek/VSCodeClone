// is side bar opened/closes
export const sideBarOpened = (state: boolean = true, action: any) => {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return state = !state
        case "SHOW_SIDEBAR":
            return state = true
        case "HIDE_SIDEBAR":
            return state = false
        default:
            return state
    }
}

export const panelOpened = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "TOGGLE_PANEL":
            return state = !state
        case "SHOW_PANEL":
            return state = true
        case "HIDE_PANEL":
            return state = false
        default:
            return state
    }
}


// used to set a side Panel to left/right px when repositioned
export const sidePanelMovedPx = (state: any = { curr: 0, prev: 0 }, action: any) => {
    switch (action.type) {
        case "SET_SIDE_PANEL_MOVE_PX":
            return action.payload
        default:
            return state
    }
}

export const moveblePanelClicked = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "MOVEBLE_PANEL_CLICKED":
            return state = action.payload
        default:
            return state
    }
}


// used to showing or hiding command palette (ctrl+p)
export const commandPaletteOpened = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "OPEN_COMMAND_PALETTE":
            return state = true
        case "CLOSE_COMMAND_PALETTE":
            return state = false
        default:
            return state
    }
}

// used to show the first menu when click on the user icon on the left panel
export const accountPopupMenuOpen = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "TOGGLE_ACCOUNT_POPUP_MENU":
            return state = !state
        case "SHOW_ACCOUNT_POPUP_MENU":
            return state = true
        case "HIDE_ACCOUNT_POPUP_MENU":
            return state = false
        default:
            return state
    }
}



export const rightClickMouseMenuOpened = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "SHOW_RIGHT_CLICK_MOUSE_MENU":
            return state = true
        case "HIDE_RIGHT_CLICK_MOUSE_MENU":
            return state = false
        default:
            return state
    }
}

export const rightClickMouseMenuCoords = (state: any = { clientX: 0, clientY: 0, data: {} }, action: any) => {
    switch (action.type) {
        case "SET_RIGHT_CLICK_MOUSE_MENU_COORDS":
            return action.payload
        default:
            return state
    }
}