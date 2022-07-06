import React, { useContext } from 'react'

// components
import Explorer from './Explorer/Explorer'
import Search from './Search/Search'
import MovePanel from './MovePanel/MovePanel'

// styles
import * as S from './SideBar.styled'

// hooks
import { useSelector } from 'react-redux'

function SideBar() {
  const leftMenuActiveItem = useSelector<any, any>(state => state.leftMenuActiveItem)

  return (
    <S.SideBarContainer>
      {leftMenuActiveItem === 'explorer' && <Explorer />}
      {leftMenuActiveItem === 'search' && <Search />}
      <MovePanel />
    </S.SideBarContainer>
  )
}

export default SideBar
