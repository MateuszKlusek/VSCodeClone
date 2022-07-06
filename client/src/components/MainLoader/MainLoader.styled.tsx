import styled, { keyframes } from 'styled-components'

export const MainLoaderContainer = styled.div`
  background: #24252f;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MainLoader = styled.div`
  background: #1d3787;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 100vh;
  color: #1d3787;
  text-indent: -9999em;
  /* margin: 88px auto; */
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;

  &::before {
    background: #1d3787;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
    position: absolute;
    top: 0;
    content: '';
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  &::after {
    background: #1d3787;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
    position: absolute;
    top: 0;
    content: '';
    left: 1.5em;
  }

  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
`

export const Text = styled.div`
  user-select: none;
  position: absolute;
  padding-top: 150px;
  font-size: 18px;
  letter-spacing: 1px;
  color: #adbfdb;
  text-transform: uppercase;
  text-align: center;
`
