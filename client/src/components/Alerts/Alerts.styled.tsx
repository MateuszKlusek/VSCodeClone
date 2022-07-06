import styled from 'styled-components'



interface IAlertContainer {
  panelOpened: boolean
}

export const AlertContainer = styled.div<IAlertContainer>`
position: absolute;
  width: 300px;
  min-height: auto;
  right: 40px;
  bottom: ${(props) => (props.panelOpened ? '180px' : '-20px')};
  z-index: 800;
`