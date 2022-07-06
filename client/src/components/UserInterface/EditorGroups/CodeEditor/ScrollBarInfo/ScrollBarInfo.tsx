import React, { FC, memo } from 'react'

import * as S from './ScrollBarInfo.styled'

const ScrollBarInfo: FC<ScrollBarInfoProps> = ({ height }) => {
  return <S.ScrollBarContainer height={height} />
}

export default memo(ScrollBarInfo)
