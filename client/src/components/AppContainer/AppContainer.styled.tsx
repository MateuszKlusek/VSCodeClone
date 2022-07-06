import styled from 'styled-components'

import Settings from '../../helpers/settings.json'


interface IAppContainerContainer {
  children: any
}
export const AppContainerContainer = styled.div<IAppContainerContainer>`
`

interface IAppContainer {
  sideBarOpened: boolean
  sidePanelMovedPx: number
  children: any
}

export const AppContainer = styled.div<IAppContainer>`
  z-index: 500;
  overflow: hidden;
  /* font-family: 'Roboto Mono', monospace; */
  /* inconsolata is probably the most similar font-family to the Microsoft's Consolas  */
  font-family: 'Inconsolata', monospace;
  width: 100%;
  height: 100vh;
  filter: brightness(1);
  display: grid;
  grid-template-columns: ${(props) => {
    if (Settings['workbench.sideBar.location'] === 'left') {
      return `55px ${props.sideBarOpened === true ? `${200 + props.sidePanelMovedPx}px` : ''} auto`
    } else {
      return `auto ${props.sideBarOpened === true ? `${200 + props.sidePanelMovedPx}px` : ''} 55px`
    }
  }};
  grid-template-rows: auto 28px;
  position: relative;
  grid-template-areas: ${(props) => {
    if (Settings['workbench.sideBar.location'] === 'left') {
      var s = `
    'leftMenu ${props.sideBarOpened === true ? `explorerMenu` : ``} editorContainer'
    'statusBar ${props.sideBarOpened === true ? `statusBar` : ``} statusBar'
    `
      return s
    } else {
      var s = `
    'editorContainer ${props.sideBarOpened === true ? `explorerMenu` : ``}  leftMenu'
    'statusBar ${props.sideBarOpened === true ? `statusBar` : ``} statusBar'
    `
      return s
    }
  }};
`
