// react
import React, { FC, useRef, useState, useEffect, useContext, useCallback } from 'react'

// styles
import * as S from './Tabs.styled'

// packages
import _ from 'lodash'

// helpers
import { saveOpenFilesToStorage } from '../../../../../helpers/storage.js'
import { changeTabs } from '../../../../../helpers/misc'
import { filterFileIcon } from '../../../../../helpers/icons.js'
import { removeTab } from '../../../../../helpers/data'

// assets
import xmark from '../../../../../assets/FA/xmark-solid.svg'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from '../../../../../hooks/useWindowSize'

// actions
import { setOpenFiles } from '../../../../../actions'
import { filesData } from '../../../../../reducers/filesDataReducer'

const Tabs: FC<TabsProps> = ({ editorId }) => {
  const dispatch = useDispatch()


  // window size
  const windowSize = useWindowSize()


  const openFiles = useSelector<any, any>(state => state.openFiles)
  const focusedEditor = useSelector<any, any>(state => state.focusedEditor)
  const sidePanelMovedPx = useSelector<any, any>(state => state.sidePanelMovedPx)

  // states
  const [forceUpdate, setForceUpdate] = useState(true)

  // useRefs
  const TabsRefs = useRef([])
  const TabsRef = useRef<HTMLDivElement>(null)
  // when Tabs is being rerendered, we've got new TabsRefs, so be are cleaning sth that doesn't exist anymore in this state
  // useEffects
  useEffect(() => {
    function handleDragStart(e: any) {
      try {
        e.dataTransfer.setData('text', JSON.stringify(e.target.data[1]))
        e.dataTransfer.setData('index', JSON.stringify(e.target.data[2]))
      } catch (err) {
      }
    }

    function handleDragEnd(e: any) {
      TabsRefs.current.forEach((tab: any) => {
        tab[0] && (tab[0].style.background = '')
      })
    }

    function handleDragOver(e: any) {
      if (e.preventDefault) {
        e.preventDefault()
      }
      //@ts-ignore
      this.style.background = '#1B1D3D'
    }

    function handleDragLeave(e: any) {
      //@ts-ignore
      this.style.background = ''
    }

    function handleDrop(e: any) {
      try {
        if (e.currentTarget.data[2] !== Number(e.dataTransfer.getData('index'))) {

          var fileIdFrom = JSON.parse(e.dataTransfer.getData("text")).fileId
          var fileIdTo = e.currentTarget.data[1].fileId

          // right now only can change tabs from one editor to another
          // and multieditor support 
          // when you remove tab from the editor, close this editor

          // don't change focused property
          var focusedEditorFilesData = (openFiles.editors[focusedEditor].data);
          var fileIdxFrom: number = -1, fileIdxTo: number = -1;
          focusedEditorFilesData.map((q: any, idx: any) => {
            if (q.fileId === fileIdFrom) {
              fileIdxFrom = Number(idx)
            }
            if (q.fileId === fileIdTo) {
              fileIdxTo = Number(idx)
            }
          })

          // swap files based on indexes
          var tmp = focusedEditorFilesData[fileIdxFrom]
          focusedEditorFilesData[fileIdxFrom] = focusedEditorFilesData[fileIdxTo]
          focusedEditorFilesData[fileIdxTo] = tmp

          var _openFiles = openFiles
          _openFiles.editors[focusedEditor].data = focusedEditorFilesData
          _openFiles = _.cloneDeep(_openFiles)

          dispatch(setOpenFiles(_openFiles))
          saveOpenFilesToStorage(_openFiles)
          setForceUpdate((prev) => !prev)
        }
      } catch (err) { }
    }

    TabsRefs.current.forEach(function (tab: any) {
      tab[0] && (tab[0].data = tab)
      tab[0] && tab[0].addEventListener('dragstart', handleDragStart)
      tab[0] && tab[0].addEventListener('dragend', handleDragEnd)
      // can't removeevent listener when there an arrow function, not normal like the line below
      tab[0] && tab[0].addEventListener('dragover', handleDragOver)
      tab[0] && tab[0].addEventListener('dragleave', handleDragLeave)
      tab[0] && tab[0].addEventListener('drop', handleDrop)
    })

    return () => {
      TabsRefs.current.forEach((tab: any) => {
        tab[0] && tab[0].removeEventListener('dragstart', handleDragStart)
        tab[0] && tab[0].removeEventListener('dragend', handleDragEnd)
        tab[0] && tab[0].removeEventListener('dragover', handleDragOver)
        tab[0] && tab[0].removeEventListener('dragleave', handleDragLeave)
        tab[0] && tab[0].removeEventListener('drop', handleDrop)
      })
    }
  }, [openFiles])






  const highlightFileFromTabs = (el: any) => {
    // find fileId for the focused file in focused editor
    try {
      var focusedEditorData = openFiles.editors[focusedEditor].data
      for (var singleFile of focusedEditorData) {
        if (singleFile.fileId === el.fileId) {
          if (singleFile.focused) {
            return true
          } else {
            return false
          }
        }
      }
      return false
    } catch (err) {
      return false
    }
  }




  useEffect(() => {
    function handleMouseScroll(e: any) {
      e.preventDefault()
      if (TabsRef.current) {
        console.log("scroled")
        TabsRef.current.scrollLeft += e.deltaY;
        console.log(TabsRef.current.scrollLeft);
      }
    }
    TabsRef.current && TabsRef.current.addEventListener("wheel", handleMouseScroll)

    return () => {
      TabsRef.current && TabsRef.current.removeEventListener("wheel", handleMouseScroll)
    }
  }, [])


  return (
    <S.Tabs ref={TabsRef} width={windowSize.width - sidePanelMovedPx.curr - 375}>
      {openFiles.editors[focusedEditor].data.map((el: any, idx: any) => (
        <S.SingleTab
          key={idx}
          borderTop={highlightFileFromTabs(el) ? '#894873' : 'transparent'}
          backgroundColor={highlightFileFromTabs(el) ? '#24252f' : '#1e1f27'}
          draggable={true}
          //@ts-ignore
          ref={(a: any) => (TabsRefs.current[idx] = [a, el, idx])}
          onClick={() => {
            const { changed, a } = changeTabs(
              focusedEditor,
              idx,
              openFiles,
            )
            if (changed) {
              dispatch(setOpenFiles(a))
              saveOpenFilesToStorage(a)
            }
          }}
          onAuxClick={(e) => {
            e.stopPropagation()
            // only middle button
            if (e.button === 1) {
              const { change, data, localStorageAction } = removeTab([el], openFiles, focusedEditor)
              if (change) {
                dispatch(setOpenFiles(data))
                if (localStorageAction === "remove") {
                  window.localStorage.removeItem("openFiles")
                }
                if (localStorageAction === "set") {
                  saveOpenFilesToStorage(data)
                }
              }
            }
          }}
        >
          <S.Icon src={filterFileIcon(el)} alt={'logo'} />
          <S.Text>
            {(() => {
              return el.fileName
            })()}{' '}
          </S.Text>
          <S.ClosingIcon
            src={xmark}
            onClick={(e) => {
              e.stopPropagation()
              const { change, data, localStorageAction } = removeTab([el], openFiles, focusedEditor)
              if (change) {
                dispatch(setOpenFiles(data))
                if (localStorageAction === "remove") {
                  window.localStorage.removeItem("openFiles")
                }
                if (localStorageAction === "set") {
                  saveOpenFilesToStorage(data)
                }
              }
            }}
            iconNumber={el.changed ? "'\f111'" : "'\f00d'"}
            fontSize={el.changed ? '10px' : '14px'}
          ></S.ClosingIcon>
        </S.SingleTab>
      ))
      }
    </S.Tabs >
  )
}

export default Tabs
