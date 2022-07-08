import React, { FC, memo } from 'react'

// styles
import * as S from './Line.styled'

// components
import Cursor from '../Cursor/Cursor'

const Line: FC<LineProps> = ({ x, y, idx, mode, children }) => {
  return (
    <>
      <S.Line
        onClick={() => {
          // console.log(props.idx)
        }}
      >
        {y === idx && (
          <Cursor left={`${101 + x * 9.61}px`} color={'#b6bace'} mode={mode} />
        )}
        <S.LineNumber fontColor={`#72757ec0`} marginRight={''}>
          {idx - y === 0 ? '' : `${Math.abs(idx - y)} `}
        </S.LineNumber>
        <S.LineNumber
          fontColor={idx === y ? '#cdcbd5' : '#5e6494'}
          marginRight={'41px'}
        >
          {`${idx + 1} `}{' '}
        </S.LineNumber>
        <S.Child>
          {y === idx && <S.LineHighlight />}
          {children}
        </S.Child>
      </S.Line>
    </>
  )
}

export default memo(Line)
