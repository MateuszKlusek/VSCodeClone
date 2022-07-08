// hooks
import { combineReducers } from "redux"

// import reducers
import { settings } from "./settingsReducer"
import { signInModal, loginModal, registerModal, saveFileToFolderModal } from "./popupsReducer"
import { dataLoaded, filesData, focusedEditor, folderStructure, leftMenuActiveItem, openFiles, workspaces } from "./filesDataReducer"
import { codeExecutionMessage, alertData, addingFileOrFolderFromWorkspace, searching, globalSearchPhrase } from "./otherReducers"
import { sideBarOpened, commandPaletteOpened, sidePanelMovedPx, panelOpened, accountPopupMenuOpen, moveblePanelClicked, rightClickMouseMenuOpened, rightClickMouseMenuCoords } from "./UIReducer"
import { logged } from "./userDataReducer"

export const rootReducer = combineReducers({
    settings,

    signInModal, loginModal, registerModal, saveFileToFolderModal,

    dataLoaded, filesData, focusedEditor, folderStructure, leftMenuActiveItem, openFiles, workspaces,

    codeExecutionMessage, alertData, addingFileOrFolderFromWorkspace, searching, globalSearchPhrase,

    sideBarOpened, commandPaletteOpened, sidePanelMovedPx, panelOpened, accountPopupMenuOpen, moveblePanelClicked, rightClickMouseMenuOpened, rightClickMouseMenuCoords,

    logged
})