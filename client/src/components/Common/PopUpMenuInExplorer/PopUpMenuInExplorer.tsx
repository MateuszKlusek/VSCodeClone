import React, { useState } from 'react'

// styles
import * as S from './PopUpMenuInExplorer.styled'

const PopUpMenuInExplorer = () => {
  const [openEditorsInExplorer, setOpenEditorsInExplorer] = useState(true)
  const [outlineInExplorer, setOutlineInExplorer] = useState(false)
  const [timelineInExplorer, setTimelineInExplorer] = useState(true)
  const [npmScriptsInExplorer, setNpmScriptsInExplorer] = useState(true)

  return (
    <S.TopPopupMenu>
      <S.TopPopupMenuItem
        onClick={() => {
          setOpenEditorsInExplorer((prev) => !prev)
        }}
        disabled={true}
      >
        <S.Checked checked={openEditorsInExplorer} />
        Open Editors
      </S.TopPopupMenuItem>
      <S.TopPopupMenuItem disabled>
        <S.Checked checked={true} />
        Folders
      </S.TopPopupMenuItem>
      <S.TopPopupMenuItem
        onClick={() => {
          setOutlineInExplorer((prev) => !prev)
        }}
        disabled={false}
      >
        <S.Checked checked={outlineInExplorer} />
        Outline
      </S.TopPopupMenuItem>
      <S.TopPopupMenuItem
        onClick={() => {
          setTimelineInExplorer((prev) => !prev)
        }}
        disabled={false}
      >
        <S.Checked checked={timelineInExplorer} />
        Timeline
      </S.TopPopupMenuItem>
      <S.TopPopupMenuItem
        onClick={() => {
          setNpmScriptsInExplorer((prev) => !prev)
        }}
        disabled={false}
      >
        <S.Checked checked={npmScriptsInExplorer} />
        NPM Scripts
      </S.TopPopupMenuItem>
    </S.TopPopupMenu>
  )
}

export default PopUpMenuInExplorer
