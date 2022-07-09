// react
import React, { FC, useState, useContext, useEffect, useRef, useLayoutEffect } from 'react'

// packages
import gsap from 'gsap'

// styles
import * as S from './Panel.styled'

// hooks
import { useSelector } from 'react-redux'
import { useWindowSize } from '../../../hooks/useWindowSize'
import useAuth from '../../../hooks/useAuth'

const Panel: FC = () => {
  const codeExecutionMessage = useSelector<any, any>(state => state.codeExecutionMessage)
  const loginModal = useSelector<any, boolean>(state => state.loginModal)
  const registerModal = useSelector<any, boolean>(state => state.registerModal)
  const sidePanelMovedPx = useSelector<any, any>(state => state.sidePanelMovedPx)

  const [parsedTerminalMessage, setParsedTerminalMessage] = useState<any>([])

  const windowSize = useWindowSize()
  //@ts-ignore
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (codeExecutionMessage.length !== 0) {
      if (typeof codeExecutionMessage === 'string') {
        const splitM = codeExecutionMessage.split('\n')
        setParsedTerminalMessage((prev: any) => splitM)
      } else {
        if (codeExecutionMessage.code === null) {
          setParsedTerminalMessage((prev: any) => ['Code execution exceeded time limit.'])
        } else {
          setParsedTerminalMessage((prev: any) => ['Code excution was terminated.'])
        }
      }
    }
  }, [codeExecutionMessage])

  // animation
  const PanelContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (loginModal || registerModal) {
      var tl = gsap.timeline({})
      tl.to(PanelContainerRef.current, {
        webkitFilter: 'brightness(0.5)',
        filter: 'brightness(0.5)',
      })
    } else {
      var tl = gsap.timeline({})
      tl.to(PanelContainerRef.current, {
        webkitFilter: 'brightness(1)',
        filter: 'brightness(1)',
      })
    }
  }, [loginModal, registerModal])

  useLayoutEffect(() => {
    if (PanelContainerRef.current) PanelContainerRef.current.style.fontFamily = "'Inconsolata', monospace"
    // preapplying?????????????????????????????????????????
    // PanelContainerRef.current.style.fontFamily = 'Copperplate, Papyrus, fantasy'
  }, [])

  return (
    <S.PanelContainer ref={PanelContainerRef} movedPx={sidePanelMovedPx.curr} width={windowSize.width}>
      <S.TopMenu>
        <S.Tab active={false}>Problem</S.Tab>
        <S.Tab active={false}>Output</S.Tab>
        <S.Tab active={false}>Debug console</S.Tab>
        <S.Tab active={true}>Terminal</S.Tab>
      </S.TopMenu>
      <S.TextField>
        <S.TerminalPlaceholder>{auth.email}-remote %</S.TerminalPlaceholder>
        {parsedTerminalMessage.map((el: any, idx: any) => (
          <S.TextLine key={idx}>{el}</S.TextLine>
        ))}
      </S.TextField>
    </S.PanelContainer>
  )
}

export default Panel
