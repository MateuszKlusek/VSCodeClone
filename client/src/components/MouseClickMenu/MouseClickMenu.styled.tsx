import styled from "styled-components"


interface IPopUpWindowContainer {
    top: number
    left: number
}

export const PopUpWindowContainer = styled.div<IPopUpWindowContainer>`
    cursor: default;
    user-select: none;
    width: fit-content;
    white-space: nowrap;
    height: auto;
    position: absolute;
    top: ${props => `${props.top}px`};
    left: ${props => `${props.left}px`};
    background: rgb(40, 39, 48);
    border: 1px solid rgb(84, 82, 94);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px;
    color: #e6dedeee;
    box-shadow: 0px 0px 1px 1px #00000093;
    z-index: 1000;
    font-family: 'Inconsolata', monospace;
  `

interface ISingleItem {
    disabled: boolean
}

export const SingleItem = styled.div<ISingleItem>`
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'cursor')};
    display: flex;
    align-items: center;
    height: 17px;
    font-size: 14px;
  
    font-weight: 500;
    color: ${(props) => (props.disabled ? 'gray' : 'auto')};
    padding: 2px 20px 2px 5px;
  
    &:hover {
      background-color: ${(props) => (props.disabled ? '' : `rgb(0, 106, 189)`)};
      border-radius: 3px;
    }
  `

export const Separator = styled.div`
    height: 1px;
    width: 90%;
    margin: 4px 10px;
    background: #80808063;
  `

export const Text = styled.div``
