// react
import _ from 'lodash'
import React, { useState, useRef, useEffect } from 'react'

// hooks
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenFiles } from '../../actions'
import { closeCommandPalette } from '../../actions/UIModals'

// helpers
import { filterFileIcon } from '../../helpers/icons'
import { changeTabs, insert } from '../../helpers/misc'
import { saveOpenFilesToStorage } from '../../helpers/storage'

// styles
import * as S from './CommandPalette.styled'

const CommandPalette = () => {
  const dispatch = useDispatch()

  const folderStructure = useSelector<any, any>(state => state.folderStructure)
  const openFiles = useSelector<any, any>(state => state.openFiles)
  const filesData = useSelector<any, any>(state => state.filesData)
  const focusedEditor = useSelector<any, any>(state => state.focusedEditor)

  const [filteredFiles, setFilteredFiles] = useState<any>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [noMachingResults, setNoMachingResults] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

  useEffect(() => {
    var _filteredFiles: any = []
    var _filteredOpenFiles: any = []
    // first = openFiles
    for (var editorIdx of openFiles.editors) {
      for (var openFile of editorIdx.data) {
        if (openFile.fileName.includes(inputValue)) {
          _filteredOpenFiles.push({ fileName: openFile.fileName, fileId: openFile.fileId, filePath: openFile.filePath })
        }
      }
    }
    // second = the rest of the folder structure (excluding openfiles)
    var _filteredFolderStructure: any = []
    for (var file of folderStructure) {
      if (file.fileType === "file") {
        // check _filteredOpenFiled
        if (_filteredOpenFiles.filter((e: any) => e.fileId === file.fileId).length === 0) {
          if (file.fileName.includes(inputValue)) {
            _filteredFolderStructure.push({ fileName: file.fileName, fileId: file.fileId, filePath: file.filePath })
          }
        }
      }
    }
    _filteredFiles = [..._filteredOpenFiles, ..._filteredFolderStructure]
    _filteredFiles = _.cloneDeep(_filteredFiles)
    setFilteredFiles(_filteredFiles)

    if (_filteredFiles.length === 0) {
      setNoMachingResults((prev: boolean) => true)
    } else {
      setNoMachingResults((prev: boolean) => false)
    }

  }, [inputValue, noMachingResults, openFiles])

  const InputRef = useRef<HTMLInputElement>(null)

  // handle clicking outside the palette to close it 
  const PopupupContainerRef = useDetectClickOutside({
    onTriggered: () => {
      dispatch(closeCommandPalette())
    }
  })

  useEffect(() => {
    InputRef.current && InputRef.current.focus()
  }, [])


  const handleClick = (file: any) => {
    // check based on fileId if the files is in openFiles
    var fileOpened: boolean = false;
    mainLoop:
    for (var editor of openFiles.editors) {
      if (editor.data.filter((q: any, idx: any) => q.fileId === file.fileId).length > 0) {
        fileOpened = true
        break mainLoop
      }
    }

    if (fileOpened) {
      var idx = openFiles.editors[focusedEditor].data.findIndex((x: any) => x.fileId === file.fileId)
      const { changed, a } = changeTabs(
        focusedEditor,
        idx,
        openFiles,
      )
      if (changed) {
        dispatch(setOpenFiles(a))
        saveOpenFilesToStorage(a)
      }

    } else {
      // it's not opened
      var fileData = filesData[file.fileId]
      var singleOpenEditorEntry: ISingleEditorEntry = {
        fileName: fileData.fileName,
        fileId: fileData.fileId,
        filePath: fileData.filePath,
        focused: true
      }
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
          if (file.fileId === singleFile.fileId) {
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

    }
    dispatch(closeCommandPalette())
  }

  useEffect(() => {
    var countDown = (prev: any, lnOfArray: any) => {
      if (prev - 1 < 0) {
        return lnOfArray - 1
      } else {
        return prev - 1
      }
    }
    function handleArrowKeys(e: KeyboardEvent) {
      var lnOfArray = filteredFiles.length
      if (e.key === "ArrowUp") {
        setHighlightedIndex(prev => countDown(prev, lnOfArray))
      }
      if (e.key === "ArrowDown") {
        setHighlightedIndex(prev => (prev + 1) % lnOfArray)
      }
      if (e.key === "Enter") {
        var fD = filteredFiles[highlightedIndex]
        console.log(filteredFiles);
        handleClick({ fileName: fD.fileName, fileId: fD.fileId })
      }
    }

    window.addEventListener("keydown", handleArrowKeys)

    return () => {
      window.removeEventListener("keydown", handleArrowKeys)
    }
  }, [highlightedIndex, filteredFiles, openFiles, filteredFiles, focusedEditor])




  return (
    <S.PopupContainer ref={PopupupContainerRef}>
      <S.Input placeholder={'Search files by name'} ref={InputRef} onChange={(e) => {
        setInputValue(e.target.value)
      }} />
      <S.ResultContainer>
        {filteredFiles.length !== 0 && !noMachingResults && filteredFiles.map((file: any, idx: any) => (
          <S.File
            onClick={() => handleClick(file)}
            backgroundColor={idx === highlightedIndex ? "rgb(49, 51, 65)" : "auto"}
            key={idx}
          >
            <S.Icon src={filterFileIcon(file)} alt={'logo'} />
            <S.TextContainer>
              <S.Text>{file.fileName}</S.Text>
              <S.FilePathText>{file.filePath}</S.FilePathText></S.TextContainer>
          </S.File>
        ))}
        {noMachingResults &&
          <S.File backgroundColor={"auto"}  >
            <S.NoMatchText>No maching results</S.NoMatchText>
          </S.File>
        }
      </S.ResultContainer>
    </S.PopupContainer>
  )
}

export default CommandPalette
