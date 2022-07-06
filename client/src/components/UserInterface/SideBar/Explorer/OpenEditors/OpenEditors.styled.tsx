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
  cursor: pointer;
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

interface ISingleFile {
  backgroundColor: boolean
}
export const SingleFile = styled.div<ISingleFile>`
  background-color: ${(props) => (props.backgroundColor ? 'rgb(49, 51, 65)' : '')};
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgb(49, 51, 65);
  }
  padding: 1px 0;
  height: 21px;
`

export const ClosingIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  ::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f00d';
    font-size: 12px;
    margin-right: 7px;
  }
`

export const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #47f970;
  margin-right: 8px;
`

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`

export const FilePath = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: #49bf65;
  display: flex;
  white-space: nowrap;
`

export const Dot = styled.div`
  padding-top: 2px;
  display: flex;
  align-items: center;
  ::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f111';
    font-size: 3px;
  }
  margin: 0 5px;
`
