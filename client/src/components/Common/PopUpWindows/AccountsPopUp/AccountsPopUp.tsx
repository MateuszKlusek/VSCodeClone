import React, { FC, useState, useRef, useLayoutEffect } from 'react'
import * as S from './AccountsPopUp.styled'
import PopupLevel1 from './PopupLevel1/PopupLevel1'

// hooks
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useDispatch, useSelector } from 'react-redux'

// actions
import { closeAccountPopupMenu, hideAccountPopupMenu } from '../../../../actions/UIModals'
import { showLoginModal, showSigninModal } from '../../../../actions/popupsModals'

const AccountsPopUp: FC<AccountsPopUpProps> = ({ bottom, left }) => {

  const dispatch = useDispatch()

  const logged = useSelector<any, boolean>(state => state.logged)

  const [accountSubmenuShow, setAccountSubmenuShow] = useState(false)

  const PopUpFirstRef = useRef(false)
  // ref for click outside
  const PopUpWindowContainerRef = useDetectClickOutside({
    onTriggered: () => {
      PopUpFirstRef.current
        ? dispatch(hideAccountPopupMenu())
        : (PopUpFirstRef.current = true)
    },
  })

  useLayoutEffect(() => {
    // clean default styling before applying different font to mitage the "jiggle"
    // PopUpWindowContainerRef.current.style.fontFamily = 'none'
    // PopUpWindowContainerRef.current.style.fontFamily = "'Inconsolata', monospace"
  }, [])

  return (
    <S.PopUpWindowContainer ref={PopUpWindowContainerRef} bottom={bottom} left={left} onClick={(e) => {
      e.stopPropagation()
    }}>
      <S.SingleItem
        disabled={!logged}
        onMouseEnter={() => {
          setAccountSubmenuShow((prev) => true)
        }}
        onMouseLeave={() => {
          setAccountSubmenuShow((prev) => false)
        }}
      >
        {logged ? (
          <S.Text>MateuszKlusek (GitHub)</S.Text>
        ) : (
          <S.Text>You are not signed in to any accounts</S.Text>
        )}
      </S.SingleItem>

      <S.Separator />

      {logged ? (
        <S.SingleItem disabled={false}>
          <S.Text>Settings sync is on</S.Text>
        </S.SingleItem>
      ) : (
        <S.SingleItem
          onClick={(e) => {
            dispatch(hideAccountPopupMenu())
            dispatch(showSigninModal())
          }}
          disabled={false}
        >
          <S.Text> Sign in to Sync Settings </S.Text>
        </S.SingleItem>
      )}

      {accountSubmenuShow && logged && <PopupLevel1 bottom={29} right={-200} />}
    </S.PopUpWindowContainer>
  )
}

export default AccountsPopUp
