import styled from 'styled-components'

interface ICursor {
  backgroundColor: string
  mode: string
  left: string
  top: string
}

export const Cursor = styled.div<ICursor>`
  width: ${(props) => (props.mode === 'normal' ? '7.5px' : '1px')};
  height: ${(props) => (props.mode === 'normal' ? '19px' : '21px')};
  position: absolute;
  border: ${(props) => (props.mode === 'normal' ? '1px solid gold' : '')};
  background-color: ${(props) => props.backgroundColor};
  opacity: ${(props) => (props.mode === 'normal' ? 0.3 : 0.7)};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  /* z-index: 1000; */
`
