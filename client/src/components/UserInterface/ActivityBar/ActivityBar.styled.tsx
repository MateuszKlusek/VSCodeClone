import styled from 'styled-components'

export const LeftMenuContainer = styled.div`
  background-color: #2e303d;
  grid-area: leftMenu;
  filter: brightness(1);
  z-index: 1000;
`

interface IButton {
  backgroundColor: string
  borderLeft: string
  borderRight: string
  iconNumber: string
  color: string
  active: boolean
}
export const Button = styled.div<IButton>`
  position: relative;
  background-color: ${(props) => props.backgroundColor};
  cursor: ${props => props.active ? "pointer" : "not-allowed"};
  display: flex;
  justify-content: center;
  border-left: 1px ${(props) => props.borderLeft} solid;
  border-right: 1px ${(props) => props.borderRight} solid;
  align-items: center;
  width: 53px;
  height: 55px;
  opacity: ${(props) => (props.active ? '1.0' : '0.5')};
  ::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    color: ${(props) => props.color};
    content: ${(props) => props.iconNumber};
    font-size: 25px;
  }

  :hover:before {
    color: ${(props) => (props.active ? '#f7f7f0' : '')};
  }
`

export const TopButtonContainer = styled.div``

export const BottomButtonContainer = styled.div`
  position: absolute;
  bottom: 5px;
`
