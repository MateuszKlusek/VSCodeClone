export const setCodeExecutionMessage = (data: any) => {
    return {
        type: "SET_CODE_EXECUTION_MESSAGE",
        payload: data
    }
}

export const setAlertData = (data: any) => {
    return {
        type: "PUSH_ALERT",
        payload: data
    }
}

export const enableAddingFileOrFolderFromWorkspace = () => {
    return {
        type: "ADDING_FILE_OR_FOLDER_FROM_WORKSPACE",
    }
}


export const disableAddingFileOrFolderFromWorkspace = () => {
    return {
        type: "NOT_ADDING_FILE_OR_FOLDER_FROM_WORKSPACE",
    }
}





export const enableSearching = () => {
    return {
        type: "ENABLE_SEARCHING",
    }
}


export const disableSearching = () => {
    return {
        type: "DISABLE_SEARCHING",
    }
}


export const setGlobalSearchPhrase = (data: any) => {
    return {
        type: "SET_GLOBAL_SEARCH_PHRASE",
        payload: data
    }
}
