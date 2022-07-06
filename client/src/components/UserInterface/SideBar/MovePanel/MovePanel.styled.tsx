import styled from 'styled-components'

interface IMovePanelContainer {
  cursor: string
  backgroundColor: string
}
export const MovePanelContainer = styled.div<IMovePanelContainer>`
  cursor: ${(props) => props.cursor};
  height: 100%;
  width: 4px;
  background: ${(props) => props.backgroundColor};
  z-index: 5000;
  position: absolute;
  right: -2px;
`
