import Settings from "./../helpers/settings.json"

export const settings = (state: any = Settings, action: any) => {
    switch (action.type) {
        case "SET_SETTINGS":
            return action.payload
        default:
            return state
    }
}
