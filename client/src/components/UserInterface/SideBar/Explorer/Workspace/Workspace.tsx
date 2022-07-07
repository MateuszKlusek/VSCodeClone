
// react
import React, { useState, useContext, useEffect, useLayoutEffect, useRef } from 'react'

// packages
import _ from 'lodash'
import axios from 'axios'

// styles
import * as S from './Workspace.styled'

// context
import { filterFileIcon } from '../../../../../helpers/icons.js'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import { useDetectClickOutside } from 'react-detect-click-outside'

// helpers
import { saveOpenFilesToStorage } from '../../../../../helpers/storage.js'
import { generateUUIDWithoutDashed, insert } from '../../../../../helpers/misc'

// actions
import { setFolderStructure, setOpenFiles } from '../../../../../actions/index'
import { disableAddingFileOrFolderFromWorkspace } from '../../../../../actions/otherModals'
import { axiosURL } from '../../../../../config/axios'
import { sortFolderStructure } from '../../../../../utils/Misc/misc'
import { setFilesData } from '../../../../../actions/filesDataModals'
import { enableAddingFileOrFolderFromWorkspace } from '../../../../../actions/otherModals'

const Workspace = () => {
  const dispatch = useDispatch()
  // context states
  const auth = useSelector<any, any>(state => state.auth)

  const openFiles = useSelector<any, any>(state => state.openFiles)
  const folderStructure = useSelector<any, any>(state => state.folderStructure)
  const filesData = useSelector<any, any>(state => state.filesData)
  const focusedEditor = useSelector<any, number>(state => state.focusedEditor)
  const addingFileOrFolderFromWorkspace = useSelector<any>(state => state.addingFileOrFolderFromWorkspace)
  // states
  const [workspaceOpened, setWorkspaceOpened] = useState(true)

  // helper state to force rerender
  const [handleNewFileOrFolder, setHandleNewFileOrFolder] = useState<boolean>(false)


  // input for new file/folder
  const [newFileOrFolderName, setNewFileOrFolderName] = useState<string>('')




  // set focus to input field when it appeares
  useEffect(() => {
    if (addingFileOrFolderFromWorkspace) {
      if (InputFileOrFolderRef.current) {
        //@ts-ignore
        InputFileOrFolderRef.current.focus()
      }
    }
  }, [folderStructure])

  // handle clicking outside the input field (when creating new file or folder), parsing data, saving it to server and so on\
  const InputFileOrFolderRef = useDetectClickOutside({
    onTriggered: () => {
      // close input
      dispatch(disableAddingFileOrFolderFromWorkspace())
      setHandleNewFileOrFolder((prev: boolean) => true)
    }
  })


  useEffect(() => {
    function handleEnter(e: any) {
      if (addingFileOrFolderFromWorkspace) {
        if (e.code === "Enter") {
          dispatch(disableAddingFileOrFolderFromWorkspace())
          setHandleNewFileOrFolder((prev: boolean) => true)
        }
      }
    }

    window.addEventListener("keydown", handleEnter)

    return () => {
      window.removeEventListener("keydown", handleEnter)
    }
  }, [addingFileOrFolderFromWorkspace])








  // handling closing input file/folder in useEffect (because we need an updated useRef ) 
  useEffect(() => {
    if (handleNewFileOrFolder) {
      // handling non empty file/folder name
      if (newFileOrFolderName) {
        var [_singleFileInFolderViewPre] = folderStructure.filter((el: any) => el.fieldType === "input")
        var updatedFileIdx: number = folderStructure.findIndex((el: any) => el.fieldType === "input")

        // check if we have a folder with this path alread, if so, return
        var potentialDuplicate = folderStructure.filter((el: any) => el.filePath === `${_singleFileInFolderViewPre.filePath}/${newFileOrFolderName}`)
        if (potentialDuplicate.length > 0) {
          // don't do anythning, don't even close the input field
        } else {

          // polluting data
          var singleFileInFolderView: ISingleFileInFolderView = {
            fileName: newFileOrFolderName,
            filePath: `${_singleFileInFolderViewPre.filePath}/${newFileOrFolderName}`,
            depth: _singleFileInFolderViewPre.depth,
            fileType: _singleFileInFolderViewPre.fileType,
            fileId: _singleFileInFolderViewPre.fileId,
            collapsed: false,
            visible: true,
            fieldType: "file"
          }

          // if the name file is a file (not a folder), we need to create tokenized token and save to 
          var singleFileInFilesInServer: {} | ISingleFileInFilesInServer = {};
          var singleFileToFilesData: {} | IFilesDataInside = {}
          if (_singleFileInFolderViewPre.fileType === "file") {
            singleFileInFilesInServer = {
              created_at: new Date(),
              text: '[""]',
              updated_at: new Date(),
              fileId: _singleFileInFolderViewPre.fileId,
              filePath: `${_singleFileInFolderViewPre.filePath}/${newFileOrFolderName}`,
              fileName: newFileOrFolderName,
            }

            singleFileToFilesData = {
              x: 95,
              y: 65,
              mode: "normal",
              command: "",
              filePath: `${_singleFileInFolderViewPre.filePath}/${newFileOrFolderName}`,
              fileName: newFileOrFolderName,
              fileId: _singleFileInFolderViewPre.fileId,
              text: [""],
              tokenizedText: [[]],
              newFile: true
            }



            var _filesData = filesData
            _filesData[_singleFileInFolderViewPre.fileId] = singleFileToFilesData
            _filesData = _.cloneDeep(_filesData)
            dispatch(setFilesData(_filesData))
            window.localStorage.setItem("filesData", JSON.stringify(_filesData))
          }




          var _folderStructure = folderStructure
          _folderStructure[updatedFileIdx] = singleFileInFolderView
          const { sortedFolderStructure } = sortFolderStructure(_folderStructure)
          // clean input name
          setNewFileOrFolderName((prev: string) => "")

          const saveNewFile = async () => {
            // save to server
            const response = await axios({
              method: 'post',
              url: `${axiosURL}/saveNewFile`,
              data: {
                folderStructure: sortedFolderStructure,
                singleFileInFilesInServer: singleFileInFilesInServer
              }
            })
            return response
          }

          saveNewFile().then((data) => {
            if (data.status === 200) {
              dispatch(setFolderStructure(sortedFolderStructure))



            }
            if (data.status === 400) {
            }
          }).catch((err) => {
          })
        }
      } else {
        // handling empty file/folder name
        // basically remove from folderStructure input fieldType
        var _folderStructure = folderStructure.filter((el: any) => el.fieldType !== "input")
        dispatch(setFolderStructure(_folderStructure))
      }
      setHandleNewFileOrFolder((prev: boolean) => false)
    }
  }, [InputFileOrFolderRef.current, handleNewFileOrFolder])


  // functions
  const handleClick = (el: any, idx: any) => {
    if (el.fileType === 'file') {
      var singleOpenEditorEntry: ISingleEditorEntry = {
        fileName: el.fileName,
        fileId: el.fileId,
        filePath: el.filePath,
        focused: true
      }

      // handle empty openfiles (no files at all)
      if (openFiles.editors.length === 0) {
        var dataToInsert: ISingleOpenEditor = {
          editorId: focusedEditor, data: [singleOpenEditorEntry]
        }
        saveOpenFilesToStorage({ editors: [dataToInsert], metadata: {} })
        dispatch(setOpenFiles({ editors: [dataToInsert], metadata: {} }))
      } else {
        var openFilesForFocusedEditors = openFiles.editors[focusedEditor].data
        // check if the fileId of the file we want to open is already opened
        var foundFileId = false
        for (var singleFile of openFilesForFocusedEditors) {
          if (el.fileId === singleFile.fileId) {
            foundFileId = true
            break
          }
        }
        // we don't have a file in openFiles for that particulat editor
        if (!foundFileId) {
          // checking for the entry with focuesed: true and insert after that 
          // finding the index of the currently focused file after which we want the new file the be inserted
          var newOpenFilesForFocusedEditors: Array<ISingleEditorEntry> = [];
          for (var singleOpenFileIdx in openFilesForFocusedEditors) {
            if (openFilesForFocusedEditors[singleOpenFileIdx].focused) {
              newOpenFilesForFocusedEditors = insert(openFilesForFocusedEditors, singleOpenFileIdx + 1, singleOpenEditorEntry)
              newOpenFilesForFocusedEditors[Number(singleOpenFileIdx)].focused = false
              break
            }
          }

          var updatedSingleEditorData: ISingleOpenEditor = {
            editorId: focusedEditor, data: [...newOpenFilesForFocusedEditors]
          }
          var allEditorsData = _.cloneDeep(openFiles.editors)
          allEditorsData[focusedEditor] = updatedSingleEditorData

          saveOpenFilesToStorage({ editors: [...allEditorsData], metadata: {} })
          dispatch(setOpenFiles({ editors: [...allEditorsData], metadata: {} }))
        }
      }
    } else {
      // clicking on the folder (toggle collapse)
      var _folderStructure = folderStructure
      _folderStructure[idx].collapsed = !_folderStructure[idx].collapsed

      for (var i = idx + 1; i < folderStructure.length; i++) {
        if (_folderStructure[i].depth > _folderStructure[idx].depth) {
          if (_folderStructure[idx].collapsed) {
            _folderStructure[i].visible = false
          } else {
            _folderStructure[i].visible = true
          }
        }
        else {
          break
        }
        if (_folderStructure[i].collapsed) {
          break
        }
      }

      _folderStructure = _.cloneDeep(_folderStructure)
      dispatch(setFolderStructure(_folderStructure))
    }
  }


  const highlightFileFromTabs = (el: any) => {
    // find fileId for the focused file in focused editor
    try {
      var focusedEditorData = openFiles.editors[focusedEditor].data
      for (var singleFile of focusedEditorData) {
        if (singleFile.fileId === el.fileId) {
          if (singleFile.focused) {
            return true
          } else {
            return false
          }
        }
      }
      return false
    } catch (err) {
      return false
    }
  }

  const handleAddFirstFolder = () => {
    var inputData: ISingleFileInFolderView = { fileName: "", filePath: "", depth: 0, fileType: "folder", fileId: generateUUIDWithoutDashed(), collapsed: false, visible: false, fieldType: "input" }

    var _folderStructure = folderStructure
    _folderStructure.push(inputData)
    _folderStructure = _.cloneDeep(_folderStructure)

    dispatch(enableAddingFileOrFolderFromWorkspace())
    dispatch(setFolderStructure(_folderStructure))
  }

  return (
    <>
      <S.TitleSeparator
        onClick={() => {
          setWorkspaceOpened((prev) => !prev)
        }}
      >
        <S.TitleChevron collapsed={workspaceOpened} />
        WorkSpace
      </S.TitleSeparator>

      <S.A display={workspaceOpened ? 'auto' : 'none'} data-component-name={"workspace"}

        onClick={(e) => {
          e.stopPropagation()
          if (folderStructure.length === 0 && auth.isAuth) {
            handleAddFirstFolder()
          }
        }}
      >
        {folderStructure.length === 0 && auth.isAuth && <S.NoFilesInformation>
          Click here to create a new project
        </S.NoFilesInformation>}

        {folderStructure.length === 0 && !auth.isAuth && <S.NoFilesInformation>
          Login or register to create project
        </S.NoFilesInformation>}

        {folderStructure && folderStructure.map((el: ISingleFileInFolderView, idx: any) =>

          el.fieldType === "input" ?
            <S.S
              paddingLeft={el.depth}
              backgroundColor={false}
              visible={true}
              opacity={1}
              key={idx}
            >
              <S.Icon
                src={filterFileIcon(el)}
                data-id={el.fileId}
                data-component-name={"workspace"}

              />
              <S.WorkspaceInput placeholder='' ref={InputFileOrFolderRef}
                onChange={(e) => { setNewFileOrFolderName((prev: string) => e.target.value) }} /></S.S> :
            (<S.S
              paddingLeft={el.fileType === "folder" ? el.depth : el.depth}
              key={idx}
              onClick={() => {
                handleClick(el, idx)
              }}
              backgroundColor={highlightFileFromTabs(el)}
              visible={el.visible}
              opacity={addingFileOrFolderFromWorkspace ? 0.2 : 1}
              data-id={el.fileId}
              data-component-name={"workspace"}
            >
              {el.fileType === "folder" &&
                <S.Chevron
                  collapsed={el.collapsed}
                  left={el.depth}
                  data-id={el.fileId}
                  data-component-name={"workspace"}
                />}
              <S.Icon
                src={filterFileIcon(el)}
                data-id={el.fileId}
                data-component-name={"workspace"}
              />
              <S.Text
                data-id={el.fileId}
                data-component-name={"workspace"}
              >{el.fileName}</S.Text>
            </S.S>
            ))}
      </S.A>
    </>
  )
}

export default Workspace
