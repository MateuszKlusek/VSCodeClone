import React, { FC, useState } from 'react'

import * as S from './Title.styled'

const Title: FC<TitleProps> = ({ text }) => {
  const [showTopUpMenu, setShowTopUpMenu] = useState(false)
  return (
    <S.TitleContainer>
      <S.Text>{text.toUpperCase()}</S.Text>
      <S.ThreeDots
        onClick={() => {
          setShowTopUpMenu((prev) => !prev)
        }}
      />
    </S.TitleContainer>
  )
}

export default Title
