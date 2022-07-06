import React, { useState, useEffect } from 'react'
import * as S from './MainLoader.styled'

const MainLoader = () => {
  const [loadingMessageLoaded, setLoadingMessageLoaded] = useState(false)
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoadingMessageLoaded((prev) => true)
      console.log('asdf')
    }, 2000)
    const loadingTimer2 = setTimeout(() => {
      window.location.reload()
    }, 5000)

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(loadingTimer2)
    }
  }, [])
  return (
    <S.MainLoaderContainer>
      <S.MainLoader />
      {loadingMessageLoaded && <S.Text>problem with connecting to server</S.Text>}
    </S.MainLoaderContainer>
  )
}

export default MainLoader
