export const signInModal = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "TOGGLE_SIGNIN_MODAL":
            return state = !state
        case "SHOW_SIGNIN_MODAL":
            return state = true
        case "HIDE_SIGNIN_MODAL":
            return state = false
        default:
            return state
    }
}

export const loginModal = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "SHOW_LOGIN_MODAL":
            return state = true
        case "HIDE_LOGIN_MODAL":
            return state = false
        default:
            return state
    }
}

export const registerModal = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "SHOW_REGISTER_MODAL":
            return state = true
        case "HIDE_REGISTER_MODAL":
            return state = false
        default:
            return state
    }
}


export const saveFileToFolderModal = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "SHOW_SAVE_FILE_TO_FOLDER_MODAL":
            return state = true
        case "HIDE_SAVE_FILE_TO_FOLDER_MODAL":
            return state = false
        default:
            return state
    }
}
