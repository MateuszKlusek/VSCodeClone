import React, { FC, memo } from 'react'

// assets
import dot from './../../../../../assets/FA/circle-solid.svg'

// styles
import * as S from './Breadcrumbs.styled'

// functions
import { filterFileIcon } from '../../../../../helpers/icons.js'

const Breadcrumbs: FC<BreadCrumsProps> = (props) => {
  var file_path_split = props.file_path.split('/')
  // remogin first empty element since file_path starts with '/'
  file_path_split = file_path_split.filter((el) => el !== '')

  return (
    <S.FilePathContainer>
      {file_path_split.map((el, idx) => (
        <S.SingleBreadCrumContainer key={idx}>
          {idx === file_path_split.length - 1 && <S.Icon src={filterFileIcon({ fileName: el })} />}
          <S.SingleBreadcrum>
            {idx === 0 && <S.Dot src={dot} />}
            <S.BreadcrumText>{el}</S.BreadcrumText>
            {idx !== file_path_split.length - 1 && (
              <S.RightChevron fill="#7b7b98c4" viewBox="0 0 320 512">
                <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
              </S.RightChevron>
            )}
          </S.SingleBreadcrum>
        </S.SingleBreadCrumContainer>
      ))}
    </S.FilePathContainer>
  )
}

export default memo(Breadcrumbs)
