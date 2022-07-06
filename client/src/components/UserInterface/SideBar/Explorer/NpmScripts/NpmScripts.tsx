import React, { useState } from 'react'

// styles
import * as S from './NpmScripts.styled'

const NpmScripts = () => {
  const [npmScriptsOpen, setNpmScriptsOpen] = useState(false)
  return (
    <>
      <S.TitleSeparator
        onClick={() => {
          setNpmScriptsOpen((prev) => !prev)
        }}
      >
        <S.Chevron open={npmScriptsOpen} />
        npm scripts
      </S.TitleSeparator>
    </>
  )
}

export default NpmScripts
