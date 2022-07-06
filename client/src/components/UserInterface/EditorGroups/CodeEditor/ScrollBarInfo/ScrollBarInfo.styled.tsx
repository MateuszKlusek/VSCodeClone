import styled from 'styled-components'

interface IScrollBarContainer {
  height: string
}
export const ScrollBarContainer = styled.div<IScrollBarContainer>`
  pointer-events: none;
  height: ${(props) => props.height};
  width: 13px;
  position: absolute;
  right: 0;
  border: 1px solid #0000004b;
`
