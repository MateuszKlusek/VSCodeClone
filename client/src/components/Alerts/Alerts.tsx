// react
import React, { FC, useEffect, useRef, useContext } from 'react'

// styles
import * as S from './Alerts.styled'

// packages
import gsap from 'gsap'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import Alert from './Alert/Alert'

const Alerts: FC = (props) => {

  const dispatch = useDispatch()

  const panelOpened = useSelector<any, boolean>(state => state.panelOpened)
  const alertData = useSelector<any, any>(state => state.alertData)

  useEffect(() => {
  }, [alertData])

  return (
    <S.AlertContainer panelOpened={panelOpened}>
      {Object.keys(alertData).map((singleAlert: any) => (
        <Alert text={alertData[singleAlert].msg} key={alertData[singleAlert].id} id={alertData[singleAlert].id} />
      ))}

    </S.AlertContainer>

  )
}

export default Alerts
