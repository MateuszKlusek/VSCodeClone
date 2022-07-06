import styled from 'styled-components'

export const TabsRightMenuContainer = styled.div`
width: 100px;
  height: 40px;
  position: fixed;
  right: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #18191e;
  padding: 0 10px;
`

interface IIcon {
  active: boolean
  iconCode: string
}
export const Icon = styled.div<IIcon>`
  cursor: ${(props) => (props.active ? `pointer` : `not-allowed`)};
  color: white;
  width: 23px;
  height: 23px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.active ? '1.0' : '0.5')};
  ::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: ${(props) => props.iconCode};
    font-size: 12px;
  }
  border-radius: 5px;
  margin: 0 1px;

  &:hover {
    background-color: ${(props) => (props.active ? 'rgb(51, 52, 59)' : '')};
  }
`
