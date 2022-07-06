import styled from 'styled-components'

export const FilePathContainer = styled.div`
  font-weight: 400;
  user-select: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: rgb(98, 114, 164);
  font-size: 14px;
  letter-spacing: 0.3px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  z-index: 9000;
`
export const SingleBreadCrumContainer = styled.div`
  /* flex necessary for the case with S.Icon for the last breadcrum */
  display: flex;
`

export const SingleBreadcrum = styled.div`
  display: flex;

  &:hover {
    color: rgb(249, 248, 242);
    fill: rgb(249, 248, 242);
  }

  /* to affect svg child on hover the parent element */
  &:hover > svg {
    fill: rgb(249, 248, 242);
  }
`

export const Dot = styled.img`
  width: 13px;
  height: 13px;
  padding: 3px 8px 3px 3px;
`

export const BreadcrumText = styled.div`
  padding-top: 2px;
`

export const Icon = styled.img`
  padding-right: 4px;
  width: 18px;
  height: 18px;
`

export const RightChevron = styled.svg`
  width: 13px;
  height: 13px;
  padding: 3px;
`
