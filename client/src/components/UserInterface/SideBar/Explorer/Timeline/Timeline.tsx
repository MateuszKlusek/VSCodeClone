import React, { useState } from 'react'

// styles
import * as S from './Timeline.styled'

const Timeline = () => {
  const [timelineOpen, setTimelineOpen] = useState(false)
  return (
    <>
      <S.TitleSeparator
        onClick={() => {
          setTimelineOpen((prev) => !prev)
        }}
      >
        <S.Chevron open={timelineOpen} />
        timeline
      </S.TitleSeparator>
    </>
  )
}

export default Timeline
