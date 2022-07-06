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

interface IChevron {
  open: boolean
}
export const Chevron = styled.div<IChevron>`
  ::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f078';
    font-size: 12px;
  }
  transform: ${(props) => (props.open ? `rotate(0deg)` : `rotate(270deg)`)};
  padding-left: 5px;
  padding-right: 5px;
`
