import React, { FC, useState, useEffect, useLayoutEffect, memo } from 'react'

// styles
import * as S from './CodeEditor.styled'

// hooks
import { useWindowSize } from '../../../../hooks/useWindowSize'
import { useSelector, useDispatch } from 'react-redux'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import useAuth from '../../../../hooks/useAuth'

// components
import Line from './Line/Line'
import Tabs from './Tabs/Tabs'
import Breadcrumbs from './Breadcrumbs/Breadcrumbs'
import TabsRightMenu from './Tabs/TabsRightMenu/TabsRightMenu'

// helpers
import { classes } from '../../../../utils/LanguageSyntaxPalette/JS'
import { commands } from '../../../../utils/commands'
import { normalizeString } from '../../../../utils/Misc/normalizeData.js'
import { deleteCharacter } from '../../../../utils/InsertNavigation/DeleteCharacter.js'
import { addSingleCharacter, tab } from '../../../../utils/InsertNavigation/AddSingleCharacter.js'
import { saveOpenFilesToStorage, saveSidePanelMovedPxtoStorage } from '../../../../helpers/storage'
import { paste } from '../../../../utils/GeneralCommands/paste.js'

// actions
import { setFilesData, setLeftMenuActiveItem } from '../../../../actions/filesDataModals'
import { showSaveFileToFolderModal } from '../../../../actions/popupsModals'
import { createNewFile, generateUUIDWithoutDashed, updateFilesDataState } from '../../../../helpers/misc'
import { setAlertData } from '../../../../actions/otherModals'
import { enter } from '../../../../utils/x'
import { setOpenFiles, setSidePanelMovePx } from '../../../../actions'

// assets
import newfile from "./../../../../assets/others/newfile.png"
import open from "./../../../../assets/others/open.png"
import bigVscodeIcon from "./../../../../assets/others/big-vscode-icon.png"

// packages
import _ from 'lodash'

const CodeEditor: FC<CodeEditorProps> = ({ editorId }) => {
  // console.log('!!!!!!!!!!!!!!!!!!')
  // editor_id -> mostly to differentiate between mutliple edtors and\or set out defaults
  // I know, props drilling

  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate();
  //@ts-ignore
  const { auth } = useAuth()

  const openFiles = useSelector<any, any>(state => state.openFiles)
  const panelOpened = useSelector<any>(state => state.panelOpened)
  const alertData = useSelector<any>(state => state.alertData)
  const filesMetaData = useSelector<any, any>(state => state.filesMetaData)
  const commandPaletteOpened = useSelector<any>(state => state.commandPaletteOpened)
  const filesData = useSelector<any, any>(state => state.filesData)
  const sidePanelMovedPx = useSelector<any, any>(state => state.sidePanelMovedPx)

  const loginModal = useSelector<any>(state => state.loginModal)
  const registerModal = useSelector<any>(state => state.registerModal)
  const saveFileToFolderModal = useSelector<any>(state => state.saveFileToFolderModal)
  const addingFileOrFolderFromWorkspace = useSelector<any>(state => state.addingFileOrFolderFromWorkspace)
  const searching = useSelector<any>(state => state.searching)

  // window size
  const windowSize = useWindowSize()

  //9.61 x 21.2
  const [text, setText] = useState<any>([])
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [mode, setMode] = useState<string>('normal')
  const [command, setCommand] = useState('')

  // fileId the file currently displayed
  const [currentFileId, setCurrentFileId] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileExtension, setFileExtension] = useState('')



  // LOADING ALL DATA (STATE, LOCAL STORE OR FROM DB) TO STATES (ACTIVE FILE)
  // change the line above
  useLayoutEffect(() => {
    if (openFiles.editors.length !== 0) {
      // find fileId of the focused file in current (not focused) editor
      var fileDataWithFocusedFileId = openFiles.editors[editorId].data.filter((el: any) => el.focused === true)

      var a = fileDataWithFocusedFileId[0].fileId
      var t = filesData[a].tokenizedText
      var m = filesData[a]

      setCurrentFileId(a)
      setFileName(prev => filesData[a].fileName)
      var extension: string;
      try { extension = filesData[a].fileName.split('.')[1] }
      catch (err) {
        extension = (filesData[a][0].split("."))
        if (extension.length === 1) {
          extension = extension[0]
        } else {
          extension = extension[1]
        }
      }
      setFileExtension(prev => extension)


      setText(t)
      setX(m.x)
      setY(m.y)
      setMode(m.mode)
      setCommand(m.command)
    } else {
    }
  }, [openFiles])

  useEffect(() => {
    // to exclude first invocation
    // update localStorage for this particular file in filesData
    // this will be triggered every time we change x,y,mode, command and so one
    try {
      var fileDataWithFocusedFileId = openFiles.editors[editorId].data.filter((el: any) => el.focused === true)
      var fileId = fileDataWithFocusedFileId[0].fileId
      var filesDataFromStorage = JSON.parse(window.localStorage.getItem("filesData")!)
      var thisFileDataToUpdateLocalStorageWith: IFilesDataInside = filesDataFromStorage[fileId]
      thisFileDataToUpdateLocalStorageWith.x = x
      thisFileDataToUpdateLocalStorageWith.y = y
      thisFileDataToUpdateLocalStorageWith.command = command
      thisFileDataToUpdateLocalStorageWith.mode = mode
      thisFileDataToUpdateLocalStorageWith.tokenizedText = text
      filesDataFromStorage[fileId] = thisFileDataToUpdateLocalStorageWith
      window.localStorage.setItem("filesData", JSON.stringify(filesDataFromStorage))
    }
    catch (err) {
    }





    const changeMode = async (e: KeyboardEvent) => {
      // 48-57 => digits
      // 65-90 => characters
      // 27 => escape
      // 186 => ;
      // 13 => Enter
      // 32 => Spacebar

      if (!commandPaletteOpened && !loginModal && !registerModal && !saveFileToFolderModal && !addingFileOrFolderFromWorkspace && !searching) {

        // general commands, not based on mode
        if (!e.metaKey) {
          if (
            // change later to array/object or sth
            (e.which >= 48 && e.which <= 57) ||
            (e.which >= 65 && e.which <= 90) ||
            e.which === 27 ||
            e.which === 13 ||
            e.which === 32 ||
            e.which === 186 ||
            e.which === 188 ||
            e.which === 8 ||
            e.which === 9 ||
            e.which === 59 ||
            e.which === 186 ||
            e.which === 61 ||
            e.which === 187 ||
            e.which === 173 ||
            e.which === 189 ||
            e.which === 219 ||
            e.which === 221 ||
            e.which === 190 ||
            e.which === 192 || // backquote, backtick
            e.which === 222 // double quote
          ) {
            switch (mode) {
              case 'insert':
                if (e.code === 'Escape') {
                  const { updatedFilesDataState } = await updateFilesDataState(filesData, fileId, { command: "", mode: "normal" })
                  dispatch(setFilesData(updatedFilesDataState))
                  setMode('normal')
                  setCommand(prev => "")
                  // while "escaping" mode, move cursor left till idx 0
                  x - 9.61 >= 95 && setX((prev) => prev - 9.61)
                } else if (e.which === 32) {
                  // need to prevent, without it the pressed spacebar moves scrollbar down
                  e.preventDefault()
                  setCommand((prev) => e.key)
                } else {
                  setCommand((prev) => e.key)
                }
                break
              case 'normal':
                if (e.code === 'KeyI') {
                  const { updatedFilesDataState } = await updateFilesDataState(filesData, fileId, { mode: "insert" })
                  dispatch(setFilesData(updatedFilesDataState))
                  setMode('insert')
                } else if (e.code === 'Escape') {
                  const { updatedFilesDataState } = await updateFilesDataState(filesData, fileId, { command: "", mode: "normal" })
                  dispatch(setFilesData(updatedFilesDataState))
                  setCommand((prev) => '')
                } else if (e.code === "Space") {
                  // prevent situation when you click spacebar in normal mode the screen scrolls down
                  e.preventDefault()
                } else if ((e.code === "Enter" || e.code === "Tab") && command === "") {
                  // skip
                } else {
                  const { updatedFilesDataState } = await updateFilesDataState(filesData, fileId, { command: command + e.key })
                  dispatch(setFilesData(updatedFilesDataState))
                  setCommand((prev) => prev + e.key)
                }

                break

              default:
            }
          }
        }
      }
    }

    window.addEventListener('keydown', changeMode)

    return () => {
      window.removeEventListener('keydown', changeMode)
    }
  }, [mode, command, loginModal, registerModal, saveFileToFolderModal, addingFileOrFolderFromWorkspace, filesData, openFiles, commandPaletteOpened, x, y, text, searching])

  useEffect(() => {
    const handlePaste = async (e: any) => {
      // // @ts-ignore 
      // let pasteText = (e.clipboardData || window.clipboardData).getData('text')
      // var fileId = openFiles[editorId][activeTabs[editorId].idx].fileId
      // const { temp_big_tokenized, temp_big, change } = paste(
      //   x,
      //   y,
      //   text,
      //   pasteText,
      //   activeTabs,
      //   editorId,
      //   openFiles,
      //   tokenizedFilesData,
      // )
      // if (change) {
      //   dispatch(setTokenizedFilesData(temp_big_tokenized))
      //   setText(temp_big)
      //   setCommand((prev) => '')
      //   setX((prev) => prev + 9.61)
      // }
    }

    window.addEventListener('paste', handlePaste)

    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [command, mode, x, y])

  useEffect(() => {
    const useCommand = async () => {
      if (!commandPaletteOpened && !loginModal && !registerModal && command && openFiles.editors.length !== 0) {
        // general commands, that don't rely on certain mode
        var fileDataWithFocusedFileId = openFiles.editors[editorId].data.filter((el: any) => el.focused === true)
        var fileId = fileDataWithFocusedFileId[0].fileId

        if (command && mode === 'normal') {
          for (var cmd in commands) {
            let re = new RegExp(cmd, 'g')
            if (command.match(re)) {

              try {
                const { newX, newY, newMode, newText, changeText, alertText, misc, stringified_object } = await commands[
                  cmd
                ].call({
                  command,
                  text,
                  x,
                  y,
                  fileId,
                })
                // handling saving new file
                if (misc === "newFile") {
                  const { updatedFilesDataState } = await updateFilesDataState(filesData, fileId, { x: newX, y: newY, tokenizedText: newText, mode: "normal", command: "" })
                  dispatch(setFilesData(updatedFilesDataState))
                  dispatch(showSaveFileToFolderModal())
                } else if (misc === "saveFileContent") {
                  try {
                    const response = await axiosPrivate({
                      method: 'post',
                      url: `/saveSingleFile`,
                      data: {
                        email: auth.email,
                        fileId,
                        stringified_object
                      }
                    })
                    //@ts-ignore
                    if (response.status === 200) {
                      var _alertData: any = alertData
                      var newId = generateUUIDWithoutDashed()
                      _alertData[newId] = { msg: alertText, id: newId }
                      _alertData = _.cloneDeep(_alertData)
                      dispatch(setAlertData(_alertData))
                    }
                    const { updatedFilesDataState } = await updateFilesDataState(filesData, fileId, { x: newX, y: newY, tokenizedText: newText, mode: "normal", command: "" })
                    dispatch(setFilesData(updatedFilesDataState))
                    setCommand((prev) => '')
                    setMode('normal')
                  } catch (err) {
                    console.log(err);
                  }
                }
                else {
                  // update filesData
                  const { updatedFilesDataState } = await updateFilesDataState(filesData, fileId, { x: newX, y: newY, tokenizedText: newText, mode: "normal", command: "" })
                  dispatch(setFilesData(updatedFilesDataState))

                  var deepText = _.cloneDeep(newText)
                  changeText && setText((prev: any) => deepText)
                  setCommand((prev) => '')
                  newMode === 'insert' && setMode('insert')
                  newX && setX((prev) => newX)
                  newY && setY((prev) => newY)

                  // handling alerts
                  if (alertText) {
                    var _alertData: any = alertData
                    var newId = generateUUIDWithoutDashed()
                    _alertData[newId] = { msg: alertText, id: newId }
                    _alertData = _.cloneDeep(_alertData)
                    dispatch(setAlertData(_alertData))
                  }
                }
                break
              } catch (err) {
                console.log(err)
              }
            }
          }
        } else if (command && mode === 'insert') {
          //  with insert on and command being sth
          // 1) add single character
          // 2) remove/del single character
          // 3) paste multiple characters
          //  figure out the problem with pasting multiple line characters

          if (command === 'Backspace') {
            const { temp_big, change } = deleteCharacter(
              x,
              y,
              text,
              editorId,
              openFiles,
            )
            if (change) {
              setText(temp_big)
              setCommand((prev) => '')
              setX((prev) => prev - 9.61)
            }
          } else if (command === 'Tab') {
            // refactor to change the tab for specific amount of spaces set in settings
            const { updatedTokenizedSingleText } = tab(
              x,
              y,
              text,
              editorId,
              openFiles,
              command,
            )
            setText(updatedTokenizedSingleText)
            setCommand((prev) => '')
            setX((prev) => prev + 2 * 9.61)
          } else if (command === "Enter") {
            const { updatedTokenizedSingleText } = enter(
              x,
              y,
              text,
              editorId,
              openFiles,
              command,
            )
            setText(updatedTokenizedSingleText)
            setCommand((prev) => '')
            setX(prev => 95)
            setY(prev => prev + 21.2)
          }
          else {
            const { updatedTokenizedSingleText } = addSingleCharacter(
              x,
              y,
              text,
              editorId,
              openFiles,
              command,
            )
            // const { updatedFilesDataState } = await updateFilesDataState(filesData, fileId, { command: "", mode: "insert", tokenizedText: text })
            // dispatch(setFilesData(updatedFilesDataState))

            setText(updatedTokenizedSingleText)
            setCommand((prev) => '')
            setX((prev) => prev + 9.61)
          }
        } else {
        }
      }
    }
    useCommand()
  }, [mode, command, loginModal, registerModal])





  return (
    <>
      <S.CodeEditorContainer maxHeight={1000}>
        {auth.isAuth && openFiles.editors.length !== 0 && (
          <>
            <Tabs editorId={editorId} />
            <Breadcrumbs
              file_path={currentFileId && filesData[currentFileId].filePath}
              meta={filesMetaData}
            />
            <S.TextField
              height={
                panelOpened ? `${windowSize.height - 93 - 200}px` : `${windowSize.height - 93}px`
              }
              width={windowSize.width - sidePanelMovedPx.curr - 250}
            >
              {text.map((el: any, idx: any) => (
                <Line
                  key={idx}
                  idx={idx}
                  x={Math.round((x - 95) / 9.61)}
                  y={Math.round((y - 65) / 21.2)}
                  mode={mode}
                >
                  <S.TextLine>
                    {el.map((el2: any, idx2: any) => (
                      <S.Span
                        key={idx2}
                        // @ts-ignore
                        colorz={fileExtension === "js" ? (el2.type in classes ? classes[el2.type] : '') : "white"}
                      >
                        {normalizeString(el2)}
                      </S.Span>
                    ))}
                  </S.TextLine>
                </Line>
              ))}
              <S.PaddingSpace
                height={
                  panelOpened
                    ? `${windowSize.height - 93 - 20 - 200}px`
                    : `${windowSize.height - 93 - 20}px`
                }
              />
            </S.TextField>
            <TabsRightMenu
              text={text}
              filePath={currentFileId && filesData[currentFileId].filePath}
            />
          </>
        )}






        {(openFiles.editors.length === 0 || !auth.isAuth) &&
          <S.NoFilesContainer
            width={windowSize.width - sidePanelMovedPx.curr - 255}
          >
            <S.FirstGroup>
              <S.Title>
                Visual Studio Code Clone
              </S.Title>

              <S.Subtitle>
                Editing evolved
              </S.Subtitle>

              <S.StartingMenu>
                <S.StartingKMenuTitle> Start</S.StartingKMenuTitle>
                <S.Option onClick={() => {
                  const { _openFiles, _filesData } = createNewFile(openFiles, editorId, filesData)
                  saveOpenFilesToStorage(_openFiles)
                  dispatch(setOpenFiles(_openFiles))
                  dispatch(setFilesData(_filesData))
                }}>
                  <S.Icon src={newfile} />
                  <S.OptionText

                  >
                    New File...
                  </S.OptionText>
                </S.Option>
                <S.Option
                  onClick={() => {
                    if (sidePanelMovedPx.curr < -135) {
                      if (sidePanelMovedPx.prev < -135) {
                        dispatch(setSidePanelMovePx({ curr: 0, prev: sidePanelMovedPx.curr }))
                        saveSidePanelMovedPxtoStorage({ curr: 0, prev: sidePanelMovedPx.curr })
                      } else {
                        dispatch(setSidePanelMovePx({ curr: sidePanelMovedPx.prev, prev: sidePanelMovedPx.curr }))
                        saveSidePanelMovedPxtoStorage({ curr: sidePanelMovedPx.prev, prev: sidePanelMovedPx.curr })
                      }
                    }
                    dispatch(setLeftMenuActiveItem("explorer"))
                  }}
                >
                  <S.Icon src={open} />
                  <S.OptionText>
                    Open...
                  </S.OptionText>
                </S.Option>
              </S.StartingMenu>
            </S.FirstGroup>


            <S.VSCodeBigIconContainer>
              <S.VSCodeBigIcon src={bigVscodeIcon} alt={"vscodeicon"} /></S.VSCodeBigIconContainer>


            <S.HelperIconsContainer>
              <S.HelperText>New File</S.HelperText>
              <S.HelperIcons>
                <S.SingleIcon>
                  ⌘
                </S.SingleIcon>
                <S.SingleIcon>
                  M
                </S.SingleIcon>
              </S.HelperIcons>

              <S.HelperText>Go to file</S.HelperText>
              <S.HelperIcons>
                <S.SingleIcon>
                  ⌘
                </S.SingleIcon>
                <S.SingleIcon>
                  P
                </S.SingleIcon>
              </S.HelperIcons>


              <S.HelperText>Find in Files</S.HelperText>
              <S.HelperIcons>
                <S.SingleIcon>
                  ⇧
                </S.SingleIcon>
                <S.SingleIcon>
                  ⌘
                </S.SingleIcon>
                <S.SingleIcon>
                  F
                </S.SingleIcon>
              </S.HelperIcons>


              <S.HelperText> Toggle Activity Panel</S.HelperText>
              <S.HelperIcons>
                <S.SingleIcon>
                  ⌘
                </S.SingleIcon>
                <S.SingleIcon>
                  B
                </S.SingleIcon>
              </S.HelperIcons>
            </S.HelperIconsContainer>
          </S.NoFilesContainer>
        }


      </S.CodeEditorContainer>
    </>
  )
}

export default memo(CodeEditor)
