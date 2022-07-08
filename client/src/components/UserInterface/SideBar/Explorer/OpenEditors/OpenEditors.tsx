import React, { useState, useContext, useEffect } from 'react'
import _ from 'lodash'

// styles
import * as S from './OpenEditors.styled'

// context
import { saveOpenFilesToStorage } from '../../../../../helpers/storage.js'

// assets
import { filterFileIcon } from '../../../../../helpers/icons.js'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../../../../../hooks/useAuth'

// actions
import { setOpenFiles } from '../../../../../actions'
import { changeTabs, focusedEditorOpenFilesData } from '../../../../../helpers/misc'
import { removeTab } from '../../../../../helpers/data'

const OpenEditors = () => {

  const dispatch = useDispatch()
  // context states
  const openFiles = useSelector<any, any>(state => state.openFiles)
  const focusedEditor = useSelector<any, number>(state => state.focusedEditor)

  //@ts-ignore
  const { auth, setAuth } = useAuth();

  // states
  const [openEditorsOpened, setOpenEditorsOpened] = useState(true)

  // functions
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


  return (
    <>
      <S.TitleSeparator
        onClick={() => {
          setOpenEditorsOpened((prev) => !prev)
        }}
      >
        <S.Chevron open={openEditorsOpened} />
        Open Editors
      </S.TitleSeparator>
      <S.A display={openEditorsOpened ? 'auto' : 'none'}>
        {auth.isAuth && openFiles.editors.length !== 0 && openFiles.editors[focusedEditor].data.map((el: any, idx: any) => (
          <S.SingleFile
            key={idx}
            backgroundColor={highlightFileFromTabs(el)}
            onClick={(e) => {
              const { changed, a } = changeTabs(
                focusedEditor,
                idx,
                openFiles,
              )
              if (changed) {
                dispatch(setOpenFiles(a))
                saveOpenFilesToStorage(a)
              }
            }}
            onAuxClick={(e) => {
              // only middle button
              e.stopPropagation()
              if (e.button === 1) {
                const { change, data, localStorageAction } = removeTab([el], openFiles, focusedEditor)
                if (change) {
                  dispatch(setOpenFiles(data))
                  if (localStorageAction === "remove") {
                    window.localStorage.removeItem("openFiles")
                  }
                  if (localStorageAction === "set") {
                    saveOpenFilesToStorage(data)
                  }
                }
              }
            }}
          >
            <S.ClosingIcon
              onClick={(e) => {
                e.stopPropagation()
                const { change, data, localStorageAction } = removeTab([el], openFiles, focusedEditor)
                if (change) {
                  dispatch(setOpenFiles(data))
                  if (localStorageAction === "remove") {
                    window.localStorage.removeItem("openFiles")
                  }
                  if (localStorageAction === "set") {
                    saveOpenFilesToStorage(data)
                  }
                }
              }}
            />
            <S.Icon src={filterFileIcon(el)} />
            <S.Text>{el.fileName}</S.Text>
            <S.FilePath>
              {getProjectName(el.filePath)}
              <S.Dot />
              {getRestOfFilePath(el.filePath)}
            </S.FilePath>
          </S.SingleFile>
        ))}
      </S.A>
    </>
  )
}

export default OpenEditors
