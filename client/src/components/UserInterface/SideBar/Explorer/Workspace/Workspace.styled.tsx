import styled from 'styled-components'

export const TitleSeparator = styled.div`
  cursor: pointer;
  font-family: 'Inconsolata', monospace;
  display: flex;
  align-items: center;
  min-height: 20px;
  max-height: 20px;
  background-color: rgb(40, 42, 54);
  text-transform: uppercase;
  display: flex;
  font-size: 14px;
  padding: 2px 0;
  letter-spacing: 1px;
  font-weight: 700;
  margin-bottom: 1px;
  white-space: nowrap;
`

interface IA {
  display: string
}
export const A = styled.div<IA>`
  display: ${(props) => props.display};
`

export const NoFilesInformation = styled.div`
  font-size: 12px;
  text-align: center;
  padding: 20px 0;
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
  left: number
}
export const Chevron = styled.div<IChevron>`
  position: absolute;
  top: 3px;
  left: ${(props) => `${props.left * 10 + 2}px`};
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
  position: relative;
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



export const WorkspaceInput = styled.input`
 font-family: 'Inconsolata', monospace;
width: 100%;
height: 20px;
background-color: rgb(40, 42, 54);
border: none;
color: white;
outline: none;
`