import styled from 'styled-components'


interface IEditorContainer {
  panelOpened: boolean
}

export const EditorContainer = styled.div<IEditorContainer>`
  grid-area: editorContainer;
  display: grid;
  width: 100%;
  height: 100%;
  position: absolute;
  /* grid-template-columns: 1fr 1fr; */
  /* grid-template-rows: 1fr ${(props) => (props.panelOpened ? '200px' : '')}; */
  filter: brightness(1);
`
