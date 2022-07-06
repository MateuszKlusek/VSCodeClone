import styled from "styled-components"



interface AlertContainerProps {
    backgroundColor?: string
    panelOpened?: boolean
}

export const AlertContainer = styled.div<AlertContainerProps>`
    user-select: none;
    min-width: 300px;
    height: 40px;
    background: ${(props) => (props.backgroundColor ? props.backgroundColor : `#282a2e`)};
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0 20px 0 0;
    color: #d8e6e6;
    border-radius: 3px;
    box-shadow: 0px 0px 20px 1px rgba(4, 6, 24, 1);
    margin-bottom: 5px;
    z-index: 800;
  `

interface PunctuationProps {
    code: string
}

export const Punctuation = styled.div<PunctuationProps>`
    ::before {
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      content: ${(props) => props.code};
      color: #185bc9;
      font-size: 14px;
    }
    margin: 0 10px;
  `

export const Text = styled.div``
