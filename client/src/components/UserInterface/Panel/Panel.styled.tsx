import styled from 'styled-components'

interface IPanelContainer {
  movedPx: number
  width: number
}

export const PanelContainer = styled.div<IPanelContainer>`
  box-sizing: border-box;
  width: ${props => `${props.width - props.movedPx - 255}px`};
  height: 200px;
  border-top: 1px solid #b588f8;
  background: #24252f;
  position: absolute;
  z-index: 901;
  right: 0;
  bottom: 28px;

  filter: brightness(1);
`

export const TopMenu = styled.div`
  height: 30px;
  padding-bottom: 10px;
  display: flex;
`

interface ITab {
  active: boolean
}
export const Tab = styled.div < ITab> `
  user-select: none;
  padding: 10px 10px 0 10px;
  color: ${(props) => (props.active ? 'rgb(249, 248, 242)' : 'rgb(98, 114, 164)')};
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin: 0 10px;
  cursor: ${(props) => (props.active ? `pointer` : `not-allowed`)};
  opacity: ${(props) => (props.active ? '1.0' : '1.0')};
  border-bottom: ${(props) => (props.active ? '1px solid #ff6dbf' : '')};
`
export const TextField = styled.div`
  padding: 0 0 10px 10px;
  font-size: 14px;
  font-weight: 500;
  color: #d9dede;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 140px;

  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    /* background-color: #6d68684b; */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6d68684b;
    /* box-shadow: inset 0 0 6px rgba(182, 124, 124, 0.81); */
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: #8d858567;
  }
`

export const TerminalPlaceholder = styled.div`
  scroll-snap-align: start;
  cursor: not-allowed;
  user-select: none;
`

export const TextLine = styled.div`
  /* it's a litte bit of adjusting movement, in vscode there's a strick movement, refactor later, probably with JS */
  scroll-snap-align: start;
`
