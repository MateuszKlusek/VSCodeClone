//react
import { FC } from 'react'

// styles
import * as S from './PopupLevel1.styled'

const PopupLevel1: FC<PopupLevel1Props> = ({ bottom, right }) => {
  return (
    <S.PopUpWindowContainer bottom={bottom} right={right}>
      <S.SingleItem disabled={false}>Sing out</S.SingleItem>
    </S.PopUpWindowContainer>
  )
}

export default PopupLevel1
