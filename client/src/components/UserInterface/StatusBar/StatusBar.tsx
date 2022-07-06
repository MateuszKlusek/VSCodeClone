// react 
import React, { useState, useLayoutEffect } from 'react'

// styles
import * as S from './StatusBar.styled'

// helpers
import { normalizePixelToIndex } from '../../../utils/Misc/normalizeData.js'

// hooks
import { useSelector } from 'react-redux'
import { focusedEditorFocusedFileId, focusedEditorOpenFilesData } from '../../../helpers/misc'

const BottomStatusBar = () => {
  const focusedEditor = useSelector<any, any>(state => state.focusedEditor)
  const openFiles = useSelector<any, any>(state => state.openFiles)
  const filesData = useSelector<any, any>(state => state.filesData)

  const [fileData, setFileData] = useState<any>({})

  useLayoutEffect(() => {
    if (openFiles.editors.length !== 0) {
      const fileId = focusedEditorFocusedFileId(openFiles, focusedEditor)
      setFileData(filesData[fileId])
    }
  }, [openFiles, filesData])

  return (
    <S.StatusBarContainer>
      <S.Mode>
        {openFiles.editors.length !== 0 && `-- ${fileData.mode && fileData.mode.toUpperCase()} --`}
      </S.Mode>
      <S.Command>
        {openFiles.editors.length !== 0 && (fileData.mode !== 'insert' && fileData.command)}
      </S.Command>
      <S.CurrentPosition>
        {openFiles.editors.length !== 0 && `Ln ${Math.round((fileData.y + 1 - 65) / 21.2) + 1}, Col ${Math.round((fileData.x + 1 - 95) / 9.61) + 1}`}
      </S.CurrentPosition>
    </S.StatusBarContainer>
  )
}

export default BottomStatusBar
