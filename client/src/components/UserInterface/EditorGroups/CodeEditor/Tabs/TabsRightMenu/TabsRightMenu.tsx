// react 
import React, { FC, useState } from 'react'

// packages
import axios from 'axios'
import _ from 'lodash'

// styles
import * as S from './TabsRightMenu.styled'

// helpers
import { generateUUIDWithoutDashed } from '../../../../../../helpers/misc'

// hooks
import { useDispatch, useSelector } from 'react-redux'

// actions
import { hidePanel, showPanel } from '../../../../../../actions/UIModals'
import { setAlertData, setCodeExecutionMessage } from '../../../../../../actions/otherModals'
import useAxiosPrivate from '../../../../../../hooks/useAxiosPrivate'
import useAuth from '../../../../../../hooks/useAuth'

const TabsRightMenu: FC<TabsRightMenuProps> = ({ text, filePath }) => {
  const dispatch = useDispatch()

  const panelOpened = useSelector<any>(state => state.panelOpened)
  const alertData = useSelector<any, any>(state => state.alertData)
  const axiosPrivate = useAxiosPrivate();
  const [executionSuspended, setExecutionSuspended] = useState(false)


  //@ts-ignore
  const { auth, setAuth } = useAuth()

  const runningFile = async () => {
    setExecutionSuspended((prev) => true)
    var fileName = filePath.split('/').at(-1)
    var file_extension = fileName.split('.').at(-1)
    // await sleep(2000)
    // run only JS files, for now
    if (file_extension === 'js') {
      var codeToSend = ''
      for (let line of text) {
        if (line.length !== 0) {
          var tempText = ''
          for (var el of line) {
            //@ts-ignore
            if (el.type === 'string') {
              //@ts-ignore
              tempText += `"${el.value}"`
            } else {
              //@ts-ignore
              tempText += el.value
            }
          }
          codeToSend += `${tempText} \n`
        }
      }
      // sending code to backend

      try {
        const response = await axiosPrivate({
          method: 'post',
          url: `/runCode`,
          data: {
            email: auth.email,
            codeToRun: codeToSend,
          },
        })

        dispatch(setCodeExecutionMessage(response.data.message))
        dispatch(showPanel())
        setExecutionSuspended((prev) => false)
      } catch (err) {
        console.log(err)
      }
    } else {
      if (panelOpened) dispatch(hidePanel())
      var _alertData = alertData
      var newId = generateUUIDWithoutDashed()
      _alertData[newId] = { msg: `Code language not supported or defined - ${fileName}`, id: newId }
      _alertData = _.cloneDeep(_alertData)
      dispatch(setAlertData(_alertData))
      setExecutionSuspended((prev) => false)
    }
  }
  return (
    <S.TabsRightMenuContainer>
      <S.Icon
        iconCode={"'\f04b'"}
        active={true}
        onClick={() => {
          if (!executionSuspended) {
            runningFile()
          }
        }}
      />
      <S.Icon iconCode={"'\f126'"} active={false} />
      <S.Icon iconCode={"'\f2d0'"} active={false} />
      <S.Icon iconCode={"'\f141'"} active={false} />
    </S.TabsRightMenuContainer>
  )
}

export default TabsRightMenu
