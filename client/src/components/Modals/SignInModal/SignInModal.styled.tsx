import styled from 'styled-components'

export const SignInModalContainer = styled.div`
  user-select: none;
  position: absolute;
  width: 240px;
  height: 170px;
  border-radius: 10px;
  border: 1px solid rgb(81, 80, 86);
  box-shadow: 0px 0px 1px 1px #01010178;
  top: 50%;
  left: 50%;
  background: rgb(39, 37, 45);
  opacity: 0;
  font-family: 'Inconsolata', monospace;

  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`

export const VSIcon = styled.img`
  background: white;
  border-radius: 10px;
  padding: 3px;
  height: 40px;
  width: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  opacity: 0;
`

export const Text = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 700;
  margin: 0 10px 10px 10px;
  text-align: center;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 9px;
`

export const Button = styled.div`
  width: 104px;
  height: 27px;
  background: rgb(0, 119, 217);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 500;

  &:active {
    background: rgb(0, 157, 235);
  }
`
