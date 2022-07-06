import React, { FC, useState, useRef, useEffect, useLayoutEffect } from 'react'

import * as S from './Cursor.styled'

const Cursor: FC<CursorProps> = (props) => {
  const [backgroundColor, setBackgroundColor] = useState('')

  useLayoutEffect(() => {
    setBackgroundColor((prev) => props.color)
  }, [props.color])

  const cursorRef = useRef<HTMLDivElement>(null)

  return (
    <S.Cursor
      backgroundColor={backgroundColor}
      ref={cursorRef}
      left={props.left}
      mode={props.mode}
      top={"1px"}
    ></S.Cursor>
  )
}

export default Cursor
