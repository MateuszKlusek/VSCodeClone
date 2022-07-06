// react
import _ from 'lodash'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import { setOpenFiles } from '../../../../actions'

// modals
import { disableSearching, enableSearching, setGlobalSearchPhrase } from '../../../../actions/otherModals'
import { closeCommandPalette } from '../../../../actions/UIModals'

// 
import { filterFileIcon } from '../../../../helpers/icons'
import { changeTabs, insert } from '../../../../helpers/misc'
import { saveOpenFilesToStorage } from '../../../../helpers/storage'

// components
import Title from '../Common/Title/Title'

// styles
import * as S from './Search.styled'

const Search = () => {
  const dispatch = useDispatch()

  const [searchData, setSearchData] = useState<any>([])
  const filesData = useSelector<any, any>(state => state.filesData)
  const focusedEditor = useSelector<any, any>(state => state.focusedEditor)
  const openFiles = useSelector<any, any>(state => state.openFiles)
  const globalSearchPhrase = useSelector<any, any>(state => state.globalSearchPhrase)
  const folderStructure = useSelector<any, any>(state => state.folderStructure)

  const SearchInputRef = useRef<HTMLInputElement>(null)




  // handling search result and populating state
  useLayoutEffect(() => {
    // save this phrase to localStorage
    window.localStorage.setItem("globalSearchPhrase", globalSearchPhrase)
    if (globalSearchPhrase) {
      if (SearchInputRef.current) {
        SearchInputRef.current.value = globalSearchPhrase
      }


      // now for some reason (fix later) some filesData doesn't delete
      // so sort filesData and compare with those files in folderStructure (include only those files in filesData that are in in folderStructure)
      var filesIdInFolderStructure = _.cloneDeep(folderStructure)
      filesIdInFolderStructure = filesIdInFolderStructure.filter((el: any) => el.fileType === "file").map((el: any) => el.fileId)

      var intermediateFilesData: any = {}

      for (var fileId of filesIdInFolderStructure) {
        if (fileId in filesData) {
          intermediateFilesData[fileId] = filesData[fileId]
        }
      }



      var result = []
      for (let fileId in intermediateFilesData) {
        var file = intermediateFilesData[fileId]
        var linesWithMatches: any = []
        intermediateFilesData[fileId].text.map((lineText: any, idx: any) => {
          if (lineText.includes(globalSearchPhrase)) {
            linesWithMatches.push({ lineText, idx })
          }
        })
        if (linesWithMatches.length !== 0) {
          var lineResult = { file: file, linesWithMatches: linesWithMatches }
          result.push(lineResult)
        }
      }
      result = _.cloneDeep(result)
      setSearchData(result)
    }
  }, [globalSearchPhrase, folderStructure, filesData])




  const getProjectName = (el: any) => {
    var file_path_split = el.split('/')
    var project = file_path_split[1]
    return project
  }

  const getRestOfFilePath = (el: any) => {
    var file_path_split = el.split('/')
    var file_path_rest_split = file_path_split.slice(2)
    var file_path_rest = file_path_rest_split.join('/')
    return file_path_rest
  }

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





  return (
    <S.SearchContainer >
      <Title text={'search'} />
      <S.SearchInputContainer>
        <S.SearchInput
          placeholder={"Search"}
          ref={SearchInputRef}
          onFocus={() => {
            dispatch(enableSearching())
          }}
          onBlur={() => {
            dispatch(disableSearching())
          }}
          onChange={(e) => {
            dispatch(setGlobalSearchPhrase((e.target.value)))
          }}
        ></S.SearchInput>
      </S.SearchInputContainer>
      <S.ResultContainer>
        {globalSearchPhrase && searchData.length !== 0 && searchData.map((el: any) => (
          <S.SingleFileSearch onClick={() => {
            handleClick(el.file)
          }}>


            <S.SingleFile>
              <S.Icon src={filterFileIcon(el.file)} />
              <S.Text>{el.file.fileName}</S.Text>
              <S.FilePath>
                {getProjectName(el.file.filePath)}/
                {getRestOfFilePath(el.file.filePath)}
              </S.FilePath>
            </S.SingleFile>


            {el.linesWithMatches.map((el2: any) => (
              <S.SingleLine>{(el2.lineText)}</S.SingleLine>
            ))}</S.SingleFileSearch>
        ))}
        {globalSearchPhrase && searchData.length === 0 && <S.NoResultText>No results found.</S.NoResultText>}

      </S.ResultContainer>
    </S.SearchContainer>

  )
}

export default Search
