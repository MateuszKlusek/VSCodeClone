import styled from 'styled-components'

export const StatusBarContainer = styled.div`
  user-select: none;
  background-color: #0b1828;
  color: #e9e0e0d7;
  display: flex;
  align-items: center;
  width: 100%;
  grid-area: statusBar;
  font-size: 15px;
  font-family: 'Roboto Mono', monospace;
  z-index: 4000;
`

export const Mode = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  align-items: center;
  padding-left: 50px;
`
export const CurrentPosition = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  align-items: center;
  padding-left: 50px;
`

export const Command = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 200px;
`
