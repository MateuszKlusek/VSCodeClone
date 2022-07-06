import styled from "styled-components"

export const SaveFileToFolderModalContainer = styled.div`
   width: 400px;
   height: 400px;
   overflow:auto;
   top: 200px;
   left: 0;
   right: 0;
   margin: auto;
   position: absolute;
   color: white;
   z-index: 1300;
   font-family: 'Inconsolata', monospace;
   border-radius: 10px;
  border: 1px solid rgb(81, 80, 86);
  box-shadow: 0px 0px 1px 1px #01010178;
  background: rgb(39, 37, 45);



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

export const Title = styled.div`
top: 10px;
width: 100%;
height: 40px;    
display: flex;
justify-content: center;
align-items: center;
font-size:22px;
font-weight: 500;
letter-spacing:0.9px;
`

export const InputContainer = styled.div`
width: 90%;
display: flex;
margin: 10px 5% 20px 5%;
`

export const Input = styled.input`
width: 100%;
  background-color: rgb(36, 37, 47);
  height: 22px;
  font-size: 14px;
  padding-left: 10px;
  color: rgb(247, 247, 240);
  border: 1px solid rgb(87, 103, 154);
`

////////////////////////////////////////////////////  (from workspace)

export const A = styled.div`
  `
interface ITitleChevron {
  collapsed: boolean
}
export const TitleChevron = styled.div<ITitleChevron>`
    ::before {
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      content: '\f078';
      font-size: 12px;
    }
    transform: ${(props) => (props.collapsed ? `rotate(0deg)` : `rotate(270deg)`)};
    padding-left: 5px;
    padding-right: 5px;
  `

interface IChevron {
  collapsed: boolean
}
export const Chevron = styled.div<IChevron>`
    ::before {
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      content: '\f078';
      font-size: 12px;
    }
    transform: ${(props) => (props.collapsed ? `rotate(0deg)` : `rotate(270deg)`)};
    padding-left: ${(props) => (props.collapsed ? '1px' : "5px")};
    padding-right: ${(props) => (props.collapsed ? '9px' : "5px")};
  `

interface IFileFolderIcon {
  icon: string
}
export const FileFolderIcon = styled.div<IFileFolderIcon>`
    ::before {
      padding-top: 2px;
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      content: ${(props) => props.icon};
      font-size: 12px;
    }
    padding-right: 5px;
  `

interface IS {
  paddingLeft: number
  backgroundColor: boolean
  visible: boolean
  opacity: number
}
export const S = styled.div<IS>`
    cursor: pointer;
    padding-left: ${(props) => `${props.paddingLeft * 10 + 20}px`};
    display: ${(props) => props.visible ? "flex" : "none"};
    background-color: ${(props) => (props.backgroundColor ? 'rgb(49, 51, 65)' : '')};
    opacity: ${(props) => props.opacity};
    padding-top: 1px;
    padding-bottom: 1px;
    font-size: 14px;
    white-space: nowrap;
    &:hover {
      background-color: rgb(49, 51, 65);
    }
  `

export const Icon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
  `

export const Text = styled.div`
    padding-top: 2px;
  `