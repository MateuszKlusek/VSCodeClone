import React, { FC, useState, useRef, useLayoutEffect } from 'react'
import * as S from './AccountsPopUp.styled'
import PopupLevel1 from './PopupLevel1/PopupLevel1'

// hooks
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../../../../hooks/useAuth'

// actions
import { hideAccountPopupMenu } from '../../../../actions/UIModals'
import { showSigninModal } from '../../../../actions/popupsModals'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { setFolderStructure, setOpenFiles } from '../../../../actions'
import { setAlertData, setGlobalSearchPhrase } from '../../../../actions/otherModals'
import { setFilesData } from '../../../../actions/filesDataModals'
import { generateUUIDWithoutDashed } from '../../../../helpers/misc'
import _ from 'lodash'

const AccountsPopUp: FC<AccountsPopUpProps> = ({ bottom, left }) => {

  const dispatch = useDispatch()
  //@ts-ignore
  const { auth, setAuth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const logged = useSelector<any, boolean>(state => state.logged)
  const alertData = useSelector<any, any>(state => state.alertData)

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

  const handleLogOut = async () => {
    try {
      const response = await axiosPrivate({
        method: 'get',
        url: `/logout`,
        data: {
          email: auth.email,
        },
      })
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    finally {
      // clean localStorage
      window.localStorage.clear()
      // clean authorization data
      setAuth({ isAuth: false, accessToken: "", email: "" });
      // clean other states
      dispatch(setOpenFiles({ editors: [], metadata: {} }))
      dispatch(setGlobalSearchPhrase(''))
      dispatch(setFolderStructure([]))
      dispatch(setFilesData({}))

      // hide menu
      dispatch(hideAccountPopupMenu())

      // alert
      var _alertData: any = alertData
      var newId = generateUUIDWithoutDashed()
      _alertData[newId] = { msg: "You are logged out", id: newId }
      _alertData = _.cloneDeep(_alertData)
      dispatch(setAlertData(_alertData))
    }
  }


  return (
    <S.PopUpWindowContainer ref={PopUpWindowContainerRef} bottom={bottom} left={left} onClick={(e) => {
      e.stopPropagation()
    }}>
      <S.SingleItem
        disabled={!auth.isAuth}
        onMouseEnter={() => {
          setAccountSubmenuShow((prev) => true)
        }}
        onMouseLeave={() => {
          setAccountSubmenuShow((prev) => false)
        }}
      >
        {auth.isAuth ? (
          <S.Text>Signed in - {auth.email}</S.Text>
        ) : (
          <S.Text>You are not signed-in </S.Text>
        )}
      </S.SingleItem>

      <S.Separator />

      {auth.isAuth ? (
        <S.SingleItem disabled={false}
          onClick={() => {
            handleLogOut()
          }}>
          <S.Text

          >Log out</S.Text>
        </S.SingleItem>
      ) : (
        <S.SingleItem
          onClick={(e) => {
            dispatch(hideAccountPopupMenu())
            dispatch(showSigninModal())
          }}
          disabled={false}
        >
          <S.Text> Sign in / register </S.Text>
        </S.SingleItem>
      )}

      {accountSubmenuShow && logged && <PopupLevel1 bottom={29} right={-200} />}
    </S.PopUpWindowContainer>
  )
}

export default AccountsPopUp
