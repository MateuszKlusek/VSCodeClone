export const setLeftMenuActiveItem = (data: string) => {
    return {
        type: "SET_LEFT_MENU_ACTIVE_ITEM",
        payload: data
    }
}

export const setFilesData = (data: any) => {
    return {
        type: "SET_FILES_DATA",
        payload: data
    }
}
