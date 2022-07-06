import React, { FC, useRef } from 'react'

// styles
import * as S from './ActivityBar.styled'

// packages
import gsap from 'gsap'

// hooks
import { useDispatch, useSelector } from 'react-redux'

// actions
import { hideSideBar, showAccountPopupMenu, showSideBar, toggleAccountPopupMenu } from '../../../actions/UIModals'
import { setLeftMenuActiveItem } from '../../../actions/filesDataModals'

// components
import AccountsPopUp from '../../Common/PopUpWindows/AccountsPopUp/AccountsPopUp'
import { setSidePanelMovePx } from '../../../actions'
import { saveSidePanelMovedPxtoStorage } from '../../../helpers/storage'

const ActivityBar: FC<ActivityBarProps> = (props) => {

  const dispatch = useDispatch()

  const sideBarOpened = useSelector<any, boolean>(state => state.sideBarOpened)
  const leftMenuActiveItem = useSelector<any, string>(state => state.leftMenuActiveItem)
  const settings = useSelector<any, any>(state => state.settings)
  const accountPopupMenuOpen = useSelector<any, boolean>(state => state.accountPopupMenuOpen)

  const sidePanelMovedPx = useSelector<any, any>(state => state.sidePanelMovedPx)

  const LeftMenuContainerRef = useRef<HTMLDivElement>(null)
  // useEffect(() => {
  //   if (props.goIntoShadow) {
  //     var tl = gsap.timeline({})
  //     tl.to(LeftMenuContainerRef.current, {
  //       webkitFilter: 'brightness(0.8)',
  //       filter: 'brightness(0.8)',
  //     })
  //   } else {
  //     var tl = gsap.timeline({})
  //     tl.to(LeftMenuContainerRef.current, {
  //       webkitFilter: 'brightness(1)',
  //       filter: 'brightness(1)',
  //     })
  //   }
  // }, [props.goIntoShadow])

  // functions
  const toggleLeftMenu = (value: string) => {
    if (leftMenuActiveItem === value) {
      if (sidePanelMovedPx.curr < -135) {
        if (sidePanelMovedPx.prev < -135) {
          dispatch(setSidePanelMovePx({ curr: 0, prev: sidePanelMovedPx.curr }))
          saveSidePanelMovedPxtoStorage({ curr: 0, prev: sidePanelMovedPx.curr })
        } else {
          dispatch(setSidePanelMovePx({ curr: sidePanelMovedPx.prev, prev: sidePanelMovedPx.curr }))
          saveSidePanelMovedPxtoStorage({ curr: sidePanelMovedPx.prev, prev: sidePanelMovedPx.curr })
        }
      } else {
        dispatch(setSidePanelMovePx({ curr: -200, prev: sidePanelMovedPx.curr }))
        saveSidePanelMovedPxtoStorage({ curr: -200, prev: sidePanelMovedPx.curr })
      }
    } else {
      if (sidePanelMovedPx.curr < -135) {
        dispatch(setSidePanelMovePx({ curr: 0, prev: sidePanelMovedPx.curr }))
        saveSidePanelMovedPxtoStorage({ curr: 0, prev: sidePanelMovedPx.curr })
      }

    }
    window.localStorage.setItem("activityBarItem", value)
    dispatch(setLeftMenuActiveItem(value))

  }

  return (
    <S.LeftMenuContainer ref={LeftMenuContainerRef}>
      <S.TopButtonContainer>
        <S.Button
          iconNumber={"'\f0c5'"}
          color={leftMenuActiveItem === 'explorer' && sideBarOpened ? '#f7f7f0' : '#57679a'}
          borderLeft={
            leftMenuActiveItem === 'explorer' &&
              sideBarOpened &&
              settings['workbench.sideBar.location'] === 'left'
              ? '#894873'
              : 'transparent'
          }
          borderRight={
            leftMenuActiveItem == 'explorer' &&
              sideBarOpened &&
              settings['workbench.sideBar.location'] === 'right'
              ? '#894873'
              : 'transparent'
          }
          backgroundColor={
            leftMenuActiveItem === 'explorer' && sideBarOpened ? '#353548' : '#2e303d'
          }
          onClick={() => {
            toggleLeftMenu('explorer')
          }}
          active={true}
        ></S.Button>
        <S.Button
          iconNumber={"'\f002'"}
          color={leftMenuActiveItem === 'search' && sideBarOpened ? '#f7f7f0' : '#57679a'}
          borderLeft={
            leftMenuActiveItem === 'search' &&
              sideBarOpened &&
              settings['workbench.sideBar.location'] === 'left'
              ? 'rgb(137, 72, 115)'
              : 'transparent'
          }
          borderRight={
            leftMenuActiveItem === 'search' &&
              sideBarOpened &&
              settings['workbench.sideBar.location'] === 'right'
              ? '#894873'
              : 'transparent'
          }
          backgroundColor={leftMenuActiveItem === "search" && sideBarOpened ? '#353548' : '#2e303d'}
          onClick={() => {
            toggleLeftMenu('search')
          }}
          active={true}
        ></S.Button>
      </S.TopButtonContainer>











      <S.BottomButtonContainer>
        <S.Button
          iconNumber={"'\f2bd'"}
          color={accountPopupMenuOpen ? '#f7f7f0' : '#57679a'}
          borderLeft={'transparent'}
          borderRight={'transparent'}
          backgroundColor={""}
          onClick={() => {
            dispatch(toggleAccountPopupMenu())
          }}
          active={true}
        >
          {accountPopupMenuOpen && <AccountsPopUp bottom={30} left={30} />}
        </S.Button>
        <S.Button
          iconNumber={"'\f013'"}
          color={'#57679a'}
          borderLeft={'transparent'}
          borderRight={'transparent'}
          backgroundColor={""}
          active={false}
        ></S.Button>
      </S.BottomButtonContainer>
    </S.LeftMenuContainer>
  )
}

export default ActivityBar
