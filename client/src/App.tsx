// react
import React, { useEffect, useLayoutEffect, } from 'react'

// packages
import _ from 'lodash'
import axios from 'axios'

// getting settings
import Settings from './helpers/settings.json'


// helpers
import { axiosURL } from './config/axios.js'
import { tokenizer } from './helpers/tokenizer'
import { changeTabs, createNewFile } from './helpers/misc'
import { saveOpenFilesToStorage, saveSidePanelMovedPxtoStorage } from './helpers/storage.js'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from './hooks/useWindowSize.js'

// components
import AppContainer from './components/AppContainer/AppContainer'
import MainLoader from './components/MainLoader/MainLoader'
import ResolutionMessage from './components/UserInterface/ResolutionMessage/ResolutionMessage'

// actions
import { setDataLoaded, setFolderStructure, setMovablePanelClicked, setOpenFiles, setSettings, setSidePanelMovePx, } from './actions/index'
import { setFilesData, setLeftMenuActiveItem } from './actions/filesDataModals'
import { closeCommandPalette, hideRightClickMouseMenu, openCommandPalette, setRightClickMouseMenuCoords, showRightClickMouseMenu, togglePanel } from "./actions/UIModals"
import { sortFolderStructure } from './utils/Misc/misc'
import { setGlobalSearchPhrase } from './actions/otherModals'


function App() {
  const windowSize = useWindowSize()
  const dispatch = useDispatch()

  const loginModal = useSelector<any>(state => state.loginModal)
  const registerModal = useSelector<any>(state => state.registerModal)
  const signInModal = useSelector<any>(state => state.signInModal)
  const saveFileToFolderModal = useSelector<any>(state => state.saveFileToFolderModal)
  const commandPaletteOpened = useSelector<any, boolean>(state => state.commandPaletteOpened)

  const rightClickMouseMenuOpened = useSelector<any, boolean>(state => state.rightClickMouseMenuOpened)
  const rightClickMouseMenuCoords = useSelector<any, any>(state => state.rightClickMouseMenuCoords)

  const dataLoaded = useSelector<any>(state => state.dataLoaded)

  const focusedEditor = useSelector<any, any>(state => state.focusedEditor)
  const folderStructure = useSelector<any, any>(state => state.folderStructure)
  const openFiles = useSelector<any, any>(state => state.openFiles)
  const filesData = useSelector<any, any>(state => state.filesData)

  const sidePanelMovedPx = useSelector<any, any>(state => state.sidePanelMovedPx)

  useLayoutEffect(() => {
    window.localStorage.getItem('openFiles') &&
      dispatch(setOpenFiles(JSON.parse(window.localStorage.getItem('openFiles')!)))

    window.localStorage.getItem('sidePanelMovedPx') &&
      dispatch(setSidePanelMovePx(JSON.parse(window.localStorage.getItem('sidePanelMovedPx')!)))

    window.localStorage.getItem('globalSearchPhrase') &&
      dispatch((setGlobalSearchPhrase(window.localStorage.getItem('globalSearchPhrase')!)))

    window.localStorage.getItem('activityBarItem') &&
      dispatch((setLeftMenuActiveItem(window.localStorage.getItem('activityBarItem')!)))
  }, [])

  useLayoutEffect(() => {
    // getting all the data from mongodb
    // only when loading website / refreshing
    dispatch(setSettings(Settings))
    getUserData()
  }, [])

  const getUserData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `${axiosURL}/getUserData`,
      })
      // parsing and transforming data from server
      var template = { mode: 'normal', command: '', x: 95, y: 65 }
      var res: IFilesData = {}
      for (var el of response.data.data.filesData) {
        var tokenizedText = []
        for (var line of JSON.parse(el.text)) {
          tokenizedText.push(tokenizer(line))
        }
        res[el.fileId] = {
          ...template,
          fileName: el.fileName,
          text: JSON.parse(el.text),
          fileId: el.fileId,
          filePath: el.filePath,
          tokenizedText: tokenizedText,
          newFile: true
        }
      }
      // adding new files data from localStorage
      var tempFilesData;
      if (window.localStorage.getItem("newTempFilesData")) {
        tempFilesData = JSON.parse(window.localStorage.getItem("newTempFilesData")!)
      } else {
        tempFilesData = {}
      }

      for (const fileId in tempFilesData) {
        res[fileId] = tempFilesData[fileId]
      }


      // if there's only one browser on one computer -> there's no problem, if we have multiple computers - we have a probelem
      // need to identify browser and computer to save it in mongo and is theres the same computer, try storage
      // if it's a different browser => go with mongodb data

      // parsing and transforming folderStructure data
      var _folderStructure: Array<ISingleFileInFolderView> = []
      for (var file of response.data.data.folderStructure) {
        var singleFile = { ...file, collapsed: false, visible: true }
        delete singleFile._id
        _folderStructure.push(singleFile)
      }
      const { sortedFolderStructure } = sortFolderStructure(_folderStructure)


      // save filesData from server to localstorage to we can update it later with every click
      window.localStorage.setItem("filesData", JSON.stringify(res))

      dispatch(setFolderStructure(sortedFolderStructure))
      dispatch(setFilesData(res))
      dispatch(setDataLoaded(true))


    } catch (err: any) {
      console.log(err);
      if (err.request.response === 'A token is required for authentication.') {
        dispatch(setDataLoaded(true))
      }
    }
  }
  useEffect(() => {
    const globalKeyPress = (e: KeyboardEvent) => {
      if (!loginModal && !registerModal && !saveFileToFolderModal) {
        switch (e.key) {
          case 'b':
            if (e.metaKey) {
              if (sidePanelMovedPx.curr < -135) {
                if (sidePanelMovedPx.prev < -135) {
                  dispatch(setSidePanelMovePx({ curr: 0, prev: sidePanelMovedPx.curr }))
                  saveSidePanelMovedPxtoStorage({ curr: 0, prev: sidePanelMovedPx.curr })
                } else {
                  dispatch(setSidePanelMovePx({ curr: sidePanelMovedPx.prev, prev: sidePanelMovedPx.curr }))
                  saveSidePanelMovedPxtoStorage({ curr: sidePanelMovedPx.prev, prev: sidePanelMovedPx.curr })
                }
              }
              else {
                dispatch(setSidePanelMovePx({ curr: -200, prev: sidePanelMovedPx.curr }))
                saveSidePanelMovedPxtoStorage({ curr: -200, prev: sidePanelMovedPx.curr })
              }
            }
            break
          // the && e.key is necessary
          case /\d/.test(e.key) && e.key:
            if (e.metaKey) {
              e.preventDefault()
              const { changed, a } = changeTabs(
                focusedEditor,
                Number(e.key) - 1,
                openFiles,
              )
              if (changed) {
                dispatch(setOpenFiles(a))
                saveOpenFilesToStorage(a)
              }
            }
            break
          case 'm':
            // create new file
            // can't do it with ctrl + n, because since chrome v 4.x this cannot be overritten
            if (e.metaKey) {
              e.preventDefault()
              const { _openFiles, _filesData } = createNewFile(openFiles, focusedEditor, filesData)
              saveOpenFilesToStorage(_openFiles)
              dispatch(setOpenFiles(_openFiles))
              dispatch(setFilesData(_filesData))
            }
            break
          case 'p':
            if (e.metaKey && e.shiftKey) {
            }
            if (e.metaKey && !e.shiftKey) {
              e.preventDefault()
              dispatch(openCommandPalette())
            }
            break
          case 'f':
            if (e.metaKey && e.shiftKey) {
              if (sidePanelMovedPx.curr < -135) {
                if (sidePanelMovedPx.prev < -135) {
                  dispatch(setSidePanelMovePx({ curr: 0, prev: sidePanelMovedPx.curr }))
                  saveSidePanelMovedPxtoStorage({ curr: 0, prev: sidePanelMovedPx.curr })
                } else {
                  dispatch(setSidePanelMovePx({ curr: sidePanelMovedPx.prev, prev: sidePanelMovedPx.curr }))
                  saveSidePanelMovedPxtoStorage({ curr: sidePanelMovedPx.prev, prev: sidePanelMovedPx.curr })
                }
              }
              dispatch(setLeftMenuActiveItem("search"))
            }
            break
          case 'j':
            if (e.metaKey) {
              e.preventDefault()
              dispatch(togglePanel())
            }
            break
          case 's':
            if (e.metaKey) {
              e.preventDefault()
            }
            break

          // prevent reload website on cmd + r
          case 'r':
            if (e.metaKey) {
              // e.preventDefault()
            }
            break
          case 'Escape':
            if (commandPaletteOpened) {
              dispatch(closeCommandPalette())
            }
            break
          case 'Tab':
            e.preventDefault()
            break
          default:
        }
      }
    }
    window.addEventListener('keydown', globalKeyPress)


    return () => {
      window.removeEventListener('keydown', globalKeyPress)
    }
  }, [commandPaletteOpened, openFiles, loginModal, registerModal, signInModal, filesData, folderStructure, sidePanelMovedPx, saveFileToFolderModal])

  // handle mouseUp for movable panel 
  useEffect(() => {
    function handleMouseUp() {
      dispatch(setMovablePanelClicked(false))
    }

    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  })

  // handling appearing the right click panel and pushing data to the component 
  // closing menu is handled inside MouseClickMenu component
  useEffect(() => {
    function preventDefault(e: any) {
      if (e.button === 2) {
        e.preventDefault()
      }
      switch (e.target.getAttribute("data-component-name")) {
        case "workspace":
          if (rightClickMouseMenuOpened && folderStructure.length !== 0) dispatch(hideRightClickMouseMenu())
          if (!rightClickMouseMenuOpened && folderStructure.length !== 0) dispatch(showRightClickMouseMenu())

          var singleEditorEntry: ISingleFileInFolderView = folderStructure.find((a: any) => a.fileId === e.target.getAttribute("data-id"))
          dispatch(setRightClickMouseMenuCoords({ clientX: e.clientX, clientY: e.clientY, data: singleEditorEntry }))
          break
        default:
      }
    }

    window.addEventListener("contextmenu", preventDefault)

    return () => {
      window.removeEventListener("contextmenu", preventDefault)
    }

  }, [rightClickMouseMenuOpened, rightClickMouseMenuCoords, folderStructure, openFiles, filesData])



  return (
    <>
      {/* screen equals or bigger than 1180x800, so practically 10.1 inches or ipad air vertically and above*/}
      {/* add info about orientation for ipads  */}
      {
        windowSize.width >= 1180 && windowSize.height >= 800 ? (
          !dataLoaded ? (
            <MainLoader />
          ) : (
            <AppContainer commandPaletteOpened={commandPaletteOpened}></AppContainer>
          )
        ) : (
          <ResolutionMessage />
        )
      }
    </>
  )
}

export default App
