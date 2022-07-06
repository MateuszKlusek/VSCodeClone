import styled from 'styled-components'

export const TitleContainer = styled.div`
  background-color: rgb(33, 34, 44);
  text-transform: uppercase;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 22px;
  /* font-size: 14px; */
  letter-spacing: 1px;
  font-weight: 500;
  position: relative;
  color: white;
  user-select: none;
`

export const ThreeDots = styled.div`
  width: 23px;
  height: 23px;
  position: absolute;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  ::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f141';
    font-size: 12px;
  }
  border-radius: 5px;

  &:hover {
    background-color: rgb(51, 52, 59);
  }
`

export const Text = styled.div`
  white-space: nowrap;
`
