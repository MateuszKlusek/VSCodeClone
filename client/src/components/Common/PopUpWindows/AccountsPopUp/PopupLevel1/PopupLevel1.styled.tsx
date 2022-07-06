import styled from 'styled-components'

interface IPopUpWindowContainer {
  bottom: number
  right: number
}

export const PopUpWindowContainer = styled.div<IPopUpWindowContainer>`
  cursor: default;
  user-select: none;
  width: 200px;
  height: auto;
  position: absolute;
  bottom: ${(props) => `${props.bottom}px`};
  right: ${(props) => `${props.right}px`};
  background: rgb(40, 39, 48);
  border: 1px solid rgb(84, 82, 94);
  z-index: 1000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
  color: #e6dedeee;
  box-shadow: 0px 0px 1px 1px #00000093;
`

interface ISingleItem {
  disabled: boolean
}

export const SingleItem = styled.div<ISingleItem>`
  display: flex;
  align-items: center;
  height: 17px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.disabled ? 'gray' : 'auto')};
  padding: 2px 5px;

  &:hover {
    background-color: ${(props) => (props.disabled ? '' : `rgb(0, 106, 189)`)};
    border-radius: 3px;
  }
`
