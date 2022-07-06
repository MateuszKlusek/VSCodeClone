import styled from 'styled-components'

export const Line = styled.div`
  display: flex;
  position: relative;
  font-family: 'Roboto Mono', monospace;
  /* low brightness */
  opacity: 0.9;
`

interface ILineNumber {
  fontColor: string
  marginRight: string
}

export const LineNumber = styled.div<ILineNumber>`
  user-select: none;
  color: ${(props) => props.fontColor};
  min-width: 30px;
  height: 21px;
  text-align: right;
  font-size: 14px;
  margin-right: ${(props) => props.marginRight};
`

export const Child = styled.div`
  width: 100%;
`

export const LineHighlight = styled.div`
  /* to make the invisible highlight line truly transparent, to be able to click line underneath */
  pointer-events: none;
  left: 101px;
  width: inherit;
  height: 20px;
  border: 1px solid #6b6a7240;
  position: absolute;
  background: transparent;
`
