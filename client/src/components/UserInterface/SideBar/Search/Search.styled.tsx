import styled from 'styled-components'

export const SearchContainer = styled.div`
  user-select: none;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(33, 34, 44);
  grid-area: explorerMenu;
  color: white;
  font-family: 'Inconsolata', monospace;
`

export const SearchInputContainer = styled.div`
padding:0;
height: 20px;
margin: 5px;
display: flex;
align-items: center;
justify-content: center;
`

export const SearchInput = styled.input`
  padding: 2px 5px;
  outline: none;
  background-color: rgb(40, 41, 52);
  border: none;
  height: 100%;
  width: 100%;
  color: white ;
  font-family: 'Inconsolata', monospace;


&::placeholder{
  color: rgb(98,114,164);
}
`

export const ResultContainer = styled.div`
cursor: pointer;
margin: 5px;
height: auto;
`

export const SingleFileSearch = styled.div`
  
`

export const SingleLine = styled.div`
  display: flex;
  align-items: center;
font-size: 14px;
white-space: nowrap; 
height: 21px;
padding-left: 18px;
&:hover {
    background-color: rgb(49, 51, 65);
  }
`

export const NoResultText = styled.div`
padding-top: 10px;
padding-left: 5px;
font-size: 14px;
  color: #858282;
`


/////////
export const SingleFile = styled.div`
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
  color: white;
  margin-right: 8px;
  
`

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`

export const FilePath = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #797373;
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

