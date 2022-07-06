import styled from 'styled-components'

export const PopupContainer = styled.div`
  font-family: 'Inconsolata', monospace;
  width: 550px;
  /* height: 400px; */
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0px;
  background: rgb(30, 31, 39);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 1px 10px 1px rgb(14, 15, 23);
  z-index: 500;
`

export const ResultContainer = styled.div`
  width: 100%;
  cursor: pointer;
`

export const Input = styled.input`
  background-color: rgb(36, 37, 47);
  width: 520px;
  height: 22px;
  margin-top: 5px;
  font-size: 14px;
  padding-left: 5px;
  color: rgb(247, 247, 240);
  border: 1px solid rgb(87, 103, 154);

  &:focus {
    outline: none;
  }
  &::selection {
    background: rgb(181, 136, 248);
  }
  &::placeholder {
    color: rgb(87, 103, 154);
  }
`

interface IFile {
  backgroundColor: string
}
export const File = styled.div<IFile>`
  display: flex;
  width: auto;
  height: 22px;
  padding: 0 10px;
  color: white;
  background-color: ${props => props.backgroundColor};
  &:hover {
    background-color: rgb(49, 51, 65);
  }
`

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-top:1px;
`


export const TextContainer = styled.div`
display: flex;
align-items: center;`

export const Text = styled.div`
font-size: 14px;
`


export const FilePathText = styled.div`
margin-left: 5px;
font-size: 12px;
color: #817979;
`


export const NoMatchText = styled.div`
background: gray;
font-size: 14px;
padding: 2px 4px;
width: 100%;
`