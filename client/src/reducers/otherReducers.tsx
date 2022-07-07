export const codeExecutionMessage = (state: string = "", action: any) => {
    switch (action.type) {
        case "SET_CODE_EXECUTION_MESSAGE":
            return action.payload
        default:
            return state
    }
}

export const alertData = (state: any = {}, action: any) => {
    switch (action.type) {
        case "PUSH_ALERT":
            return state = action.payload
        default:
            return state
    }
}


export const addingFileOrFolderFromWorkspace = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "ADDING_FILE_OR_FOLDER_FROM_WORKSPACE":
            return state = true
        case "NOT_ADDING_FILE_OR_FOLDER_FROM_WORKSPACE":
            return state = false
        default:
            return state
    }
}

export const searching = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "ENABLE_SEARCHING":
            return state = true
        case "DISABLE_SEARCHING":
            return state = false
        default:
            return state
    }
}


export const globalSearchPhrase = (state: string = "", action: any) => {
    switch (action.type) {
        case "SET_GLOBAL_SEARCH_PHRASE":
            return state = action.payload
        default:
            return state
    }
}



// for authentication
export const auth = (state: any = { isAuth: false, accessToken: "", email: "" }, action: any) => {
    switch (action.type) {
        case "SET_AUTH":
            return state = action.payload
        default:
            return state
    }
}
