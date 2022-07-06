import styled from 'styled-components'

export const ResolutionMessageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #24252f;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MessageBox = styled.div`
  width: 380px;
  height: 150px;
  border: 1px solid white;
`

export const TopMessage = styled.div`
  height: 50px;
  display: flex;
  text-transform: uppercase;
  font-family: UltimateTeamCondensed, sans-serif;
  font-size: 1.6rem;
  align-items: center;
  justify-content: center;
  color: #c4f750;
  font-weight: 400;
  background-color: #201e20;

  &::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f065';
    font-size: 1.4rem;
    padding: 0 8px;
    color: #f2f2f2;
  }
`

export const BottomMessage = styled.div`
  height: 100px;

  display: flex;
  align-items: center;
  padding: 0 32px;
  background: #37404c;
  color: #f2f2f2;
  font-weight: 900;
  text-align: center;
  font-size: 0.9rem;
  font-family: UltimateTeam, sans-serif;
`
