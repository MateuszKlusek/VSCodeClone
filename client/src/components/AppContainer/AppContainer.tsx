import React, { FC, useRef, useEffect } from 'react'

// styles
import * as S from './AppContainer.styled'

// packages
import gsap from 'gsap'

// hooks
import { useSelector } from 'react-redux'

// components
import StatusBar from '../UserInterface/StatusBar/StatusBar'
import GithubLink from '../GithubLink/GithubLink'
import ActivityBar from '../UserInterface/ActivityBar/ActivityBar'
import SideBar from '../UserInterface/SideBar/SideBar'
import EditorGroups from '../UserInterface/EditorGroups/EditorGroups'
import PopupMenu from '../CommandPalette/CommandPalette'
import Alerts from '../Alerts/Alerts'
import LoginModal from '../Modals/LoginModal/LoginModal'
import RegisterModal from '../Modals/RegisterModal/RegisterModal'
import Panel from '../UserInterface/Panel/Panel'
import SignInModal from '../Modals/SignInModal/SignInModal'
import SaveFileToFolderModal from '../Modals/SaveFileToFolderModal/SaveFileToFolderModal'
import MouseClickMenu from '../MouseClickMenu/MouseClickMenu'

const AppContainer: FC<AppContainerProps> = (props) => {

  // states  
  const sideBarOpened = useSelector<any, boolean>(state => state.sideBarOpened)
  const sidePanelMovedPx = useSelector<any, any>(state => state.sidePanelMovedPx)
  const panelOpened = useSelector<any>(state => state.panelOpened)
  const commandPaletteOpened = useSelector<any>(state => state.commandPaletteOpened)

  const signInModal = useSelector<any>(state => state.signInModal)
  const loginModal = useSelector<any>(state => state.loginModal)
  const registerModal = useSelector<any>(state => state.registerModal)
  const saveFileToFolderModal = useSelector<any>(state => state.saveFileToFolderModal)

  const rightClickMouseMenuOpened = useSelector<any>(state => state.rightClickMouseMenuOpened)
  const rightClickMouseMenuCoords = useSelector<any, any>(state => state.rightClickMouseMenuCoords)

  // refs
  const AppContainerRef = useRef<HTMLDivElement>(null)

  // animation for dimming out the AppContainer when modals appear
  useEffect(() => {
    if (loginModal || registerModal || signInModal || saveFileToFolderModal) {
      var tl = gsap.timeline({})
      tl.to(AppContainerRef.current, {
        webkitFilter: 'brightness(0.5)',
        filter: 'brightness(0.5)',
      })
    } else {
      var tl = gsap.timeline({})
      tl.to(AppContainerRef.current, {
        webkitFilter: 'brightness(1)',
        filter: 'brightness(1)',
      })
    }
  }, [signInModal, loginModal, registerModal, saveFileToFolderModal])

  return (
    <S.AppContainerContainer>

      <S.AppContainer
        sideBarOpened={sideBarOpened}
        sidePanelMovedPx={sidePanelMovedPx.curr}
        ref={AppContainerRef}
      >
        <ActivityBar />
        {sideBarOpened && <SideBar />}
        <EditorGroups />
        <StatusBar />
        {panelOpened && <Panel />}
        <Alerts />
        <GithubLink url={"https://github.com/mateuszklusek/GithubBrowser"} />
      </S.AppContainer>

      {commandPaletteOpened && <PopupMenu />}


      {/* modals */}
      {signInModal && <SignInModal />}
      {loginModal && <LoginModal />}
      {registerModal && <RegisterModal />}
      {saveFileToFolderModal && <SaveFileToFolderModal />}

      {rightClickMouseMenuOpened && <MouseClickMenu top={rightClickMouseMenuCoords.clientY + 5} left={rightClickMouseMenuCoords.clientX + 5} data={rightClickMouseMenuCoords.data} />}

    </S.AppContainerContainer>
  )
}

export default AppContainer





// ActivityBar - left (or right side with custom settings) bar with icons for Explorer, Search etc. and bottom icons for user profile and settings
// SideBar = ctrl+b panel showing as a choice from ActivityBar
// EditorGroups - groups single editors
// StatusBar - bar at the bottom of the page. shows vim mode, coordinates, vim commands etc


// alert is just an alert, rebuild to multiple alerts, as a alert container and such