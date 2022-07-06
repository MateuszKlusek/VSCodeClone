import styled from 'styled-components'

interface ITabs {
  width: number
}
export const Tabs = styled.div<ITabs>`
  max-height: 40px;
  min-height: 40px;
  display: flex;
  background-color: #18191e;
  cursor: pointer;
  user-select: none;
  z-index: 9000;
  width: ${(props) => `${props.width}px`};
  overflow:hidden;

`

interface ISingleTab {
  borderTop: string
  backgroundColor: string
}
export const SingleTab = styled.div<ISingleTab>`
  position: relative;
  padding: 10px;
  min-width: 150px;
  width: auto;
  color: #47f970;
  display: flex;
  align-items: center;
  border-top: 1px ${(props) => props.borderTop} solid;
  background-color: ${(props) => props.backgroundColor};
  margin-right: 1px;
`

export const Text = styled.div`
  padding-right: 25px;
  font-size: 14px;
  font-weight: 500;
`

interface IClosingIcon {
  fontSize: string
  iconNumber: string
}
export const ClosingIcon = styled.img<IClosingIcon>`
  position: absolute;
  right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #adacb5;
  /* ::after {
    font-size: ${(props) => props.fontSize};
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    color: #adacb5;
    content: ${(props) => props.iconNumber};
  } */

  width: 18px;
  height: 18px;
  padding: 3px;

  &:hover {
    background: #7d7d8e24;
    border-radius: 5px;
  }
`

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`
