import React from 'react'

// styles
import * as S from './Explorer.styled'

// components
import Title from '../Common/Title/Title'
import OpenEditors from './OpenEditors/OpenEditors'
import Workspace from './Workspace/Workspace'
import Outline from './Outline/Outline'
import Timeline from './Timeline/Timeline'
import NpmScripts from './NpmScripts/NpmScripts'

const ExplorerMenu = () => {
  return (
    <S.ExplorerMenuContainer>
      <Title text={'explorer'} />

      <OpenEditors />
      <Workspace />
      <Outline />
      <Timeline />
      <NpmScripts />
    </S.ExplorerMenuContainer>
  )
}

export default ExplorerMenu
