// react
import React, { useState, useEffect, useContext, useRef } from 'react'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from '../../../../hooks/useWindowSize'

// actions
import { setMovablePanelClicked, setSidePanelMovePx } from '../../../../actions/index'

// helpers
import { saveSidePanelMovedPxtoStorage } from '../../../../helpers/storage.js'

// styles
import * as S from './MovePanel.styled'

const MovePanel = () => {
  const dispatch = useDispatch()

  // states
  const [showMovePanel, setShowMovePanel] = useState(false)
  const [panelBeingClicked, setPanelBeingClicked] = useState(false)

  const moveblePanelClicked = useSelector<any, boolean>(state => state.moveblePanelClicked)
  const sidePanelMovedPx = useSelector<any, any>(state => state.sidePanelMovedPx)

  const windowSize = useWindowSize()

  useEffect(() => {
    const dragPanel = (e: any) => {
      // carrier is absolute 170 px (but the basic is 200 px, so we deduct)
      if (moveblePanelClicked) {
        var diff = e.clientX - 255
        if (windowSize.width - diff < 500) {
        } else {
          if (diff >= -30) {
            var curr = sidePanelMovedPx.curr
            var newSidePanelMovedPx = { curr: diff, prev: curr }
            dispatch(setSidePanelMovePx(newSidePanelMovedPx))
            saveSidePanelMovedPxtoStorage(newSidePanelMovedPx)
          } else if (diff < -30 && diff > -115) {
          }
          else {
            var curr = sidePanelMovedPx.curr
            var newSidePanelMovedPx = { curr: -200, prev: curr }
            dispatch(setSidePanelMovePx(newSidePanelMovedPx))
            saveSidePanelMovedPxtoStorage(newSidePanelMovedPx)
          }
        }
      }
    }

    window.addEventListener('mousemove', dragPanel)

    return () => {
      window.removeEventListener('mousemove', dragPanel)
    }
  })

  return (
    <S.MovePanelContainer
      backgroundColor={showMovePanel || panelBeingClicked ? '#5f6096' : ''}
      cursor={showMovePanel || panelBeingClicked ? `col-resize` : 'auto'}
      onMouseEnter={() => setShowMovePanel((prev) => true)}
      onMouseLeave={() => setShowMovePanel((prev) => false)}
      onMouseDown={() => {
        dispatch(setMovablePanelClicked(true))
      }}
    />
  )
}

export default MovePanel
