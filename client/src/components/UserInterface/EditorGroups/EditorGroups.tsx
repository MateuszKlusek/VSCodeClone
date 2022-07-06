// react
import React, { useEffect, useContext, useRef } from 'react'

// packages
import gsap from 'gsap'

// components
import CodeEditor from './CodeEditor/CodeEditor'
import Panel from '../Panel/Panel'

// styles
import * as S from './EditorGroups.styled'
import { useSelector } from 'react-redux'

const EditorGroups = () => {
  const panelOpened = useSelector<any, boolean>(state => state.panelOpened)

  const EditorContainerRef = useRef<HTMLDivElement>(null)

  return (
    <S.EditorContainer panelOpened={panelOpened} ref={EditorContainerRef}>
      <CodeEditor editorId={0} />
    </S.EditorContainer>
  )
}

export default EditorGroups
