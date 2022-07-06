export const toggleSigninModal = () => {
    return {
        type: "TOGGLE_SIGNIN_MODAL",
    }
}

export const showSigninModal = () => {
    return {
        type: "SHOW_SIGNIN_MODAL",
    }
}

export const hideSigninModal = () => {
    return {
        type: "HIDE_SIGNIN_MODAL",
    }
}

export const hideRegisterModal = () => {
    return {
        type: "HIDE_REGISTER_MODAL",
    }
}

export const showRegisterModal = () => {
    return {
        type: "SHOW_REGISTER_MODAL",
    }
}




////////////////////////////////////////////////////////////////////// 
export const showSaveFileToFolderModal = () => {
    return {
        type: "SHOW_SAVE_FILE_TO_FOLDER_MODAL",
    }
}

export const hideSaveFileToFolderModal = () => {
    return {
        type: "HIDE_SAVE_FILE_TO_FOLDER_MODAL",
    }
}

//////////////////////////////////////////////////////////////////////



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

export const showLoginModal = () => {
    return {
        type: "SHOW_LOGIN_MODAL"
    }
}

export const hideLoginModal = () => {
    return {
        type: "HIDE_LOGIN_MODAL"
    }
}