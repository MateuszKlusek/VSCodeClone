import React, { useState } from 'react'

// styles
import * as S from './Outline.styled'

const Outline = () => {
  const [outlineOpen, setOutlineOpen] = useState(false)
  return (
    <>
      <S.TitleSeparator
        onClick={() => {
          setOutlineOpen((prev) => !prev)
        }}
      >
        <S.Chevron open={outlineOpen} />
        outline
      </S.TitleSeparator>
    </>
  )
}

export default Outline
