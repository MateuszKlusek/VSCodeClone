// state for logged-in/logged-off
export const logged = (state: boolean = false, action: any) => {
    switch (action.type) {
        case "SET_USER_LOGGED":
            return state
        default:
            return state
    }
}