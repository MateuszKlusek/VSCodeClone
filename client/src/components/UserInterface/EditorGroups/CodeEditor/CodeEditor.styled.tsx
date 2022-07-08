import styled from 'styled-components'

interface ICodeEditorContainer {
  maxHeight: number
}

export const CodeEditorContainer = styled.div<ICodeEditorContainer>`
  width: 100%;
  /* max-height: ${(props) => `${props.maxHeight}px`}; */
  /* height: 100%; */
  background-color: #24252f;
  position: relative;
`

export const Line = styled.div`
  display: flex;
`

interface ISpan {
  color: string
}
export const Span = styled.span<ISpan>`
  /* without it multiple whitespaces next to each other 'collape' into one */
  white-space: pre-wrap;
  color: ${(props) => props.color};
  &::selection {
    background: rgb(60, 62, 80);
  }
`
export const TextLine = styled.div`
  width: 100%;
`

interface ITextField {
  height: string
  width: number
}

export const TextField = styled.div<ITextField>`
  overflow-y: scroll;
  overflow-x: hidden;
  max-width:${(props) => `${props.width}px`};
  min-width:${(props) => `${props.width}px`};
  height: ${(props) => props.height};
  /* overflow: overlay; */
  &::-webkit-scrollbar {
    width: 15px;
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
interface IPaddingSpace {
  height: string
}

export const PaddingSpace = styled.div<IPaddingSpace>`
  height: ${(props) => props.height};
`



// no files styling

interface INoFilesContainer {
  width: number
}

export const NoFilesContainer = styled.div<INoFilesContainer>`
  user-select:none;
  width: ${props => `${props.width}px`};
  box-sizing: border-box;
  display: flex;
  flex-direction:column;
  align-items: center;
`

export const FirstGroup = styled.div`
  
`

export const Title = styled.div`
color: #eae8e8;
font-size: 34px;
font-weight: 500;
margin-top: 100px;
`

export const Subtitle = styled.div`
color: #a69e9e;
font-size: 26px;
font-weight: 500;
margin-top: 7px;
`

export const StartingMenu = styled.div`
margin-top: 40px;
 font-size: 19px;
 font-weight: 300;
 color: #eae8e8;
`

export const StartingKMenuTitle = styled.div`
  
`

export const Option = styled.div`
  width: 100px;
  cursor:pointer;
  font-size: 14px;
  color: #3894ff;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-top: 10px;
`

export const Icon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 8px;
`
export const OptionText = styled.div`
`

export const VSCodeBigIconContainer = styled.div`
   margin-top: 50px;
   width: 300px; 
   height: 300px;
`


export const VSCodeBigIcon = styled.img`
  width: 100%;
  opacity: 0.3;
`

export const HelperIconsContainer = styled.div`
  margin-top: 50px;
  width: 400px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: repeat(4, 20px);
  row-gap: 10px;
  column-gap: 10px;
  color: #788288;
  font-size: 14px;
`

export const HelperText = styled.div`
  height: 100%;
  font-weight: 500;
  text-align: right;
 `

export const HelperIcons = styled.div`
  display: flex;
`
export const SingleIcon = styled.div`
  color: #a1a2a5; 
  box-shadow: 1px 1px 5px 1px #39393b22;
  border-bottom: 1px solid black;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e2f38;
  height: 100%;
  padding: 0 6px;
  border-radius: 4px;
  margin: 0 3px;
  
`