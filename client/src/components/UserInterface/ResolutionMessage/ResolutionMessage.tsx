import React from 'react'

import * as S from './ResolutionMessage.styled'

const ResolutionMessage = () => {
  return (
    <S.ResolutionMessageContainer>
      {/* add some background structure */}

      <S.MessageBox>
        <S.TopMessage>Resize window</S.TopMessage>
        <S.BottomMessage>
          Please increate the size of your web browser window to display the content.
        </S.BottomMessage>
      </S.MessageBox>
    </S.ResolutionMessageContainer>
  )
}

export default ResolutionMessage
