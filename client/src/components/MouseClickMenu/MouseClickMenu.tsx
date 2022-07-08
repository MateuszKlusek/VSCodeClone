// react
import React, { FC, useEffect } from 'react'

// packages
import _ from 'lodash';
import axios from 'axios';

// hooks
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { setFolderStructure, setOpenFiles } from '../../actions';
import { setFilesData } from '../../actions/filesDataModals';
import { enableAddingFileOrFolderFromWorkspace, setAlertData } from '../../actions/otherModals';
import { hideRightClickMouseMenu } from '../../actions/UIModals';

// helpers
import { removeTab } from '../../helpers/data';
import { generateUUIDWithoutDashed } from '../../helpers/misc';
import { saveOpenFilesToStorage } from '../../helpers/storage';

// style
import * as S from "./MouseClickMenu.styled"
import { insert } from '../../utils/Misc/misc';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const MouseClickMenu: FC<MouseClickMenuProps> = ({ top, left, data }) => {

    const dispatch = useDispatch()

    const openFiles = useSelector<any, any>(state => state.openFiles)
    const folderStructure = useSelector<any, any>(state => state.folderStructure)
    const focusedEditor = useSelector<any, any>(state => state.focusedEditor)
    const alertData = useSelector<any, any>(state => state.alertData)
    const filesData = useSelector<any, any>(state => state.filesData)

    const axiosPrivate = useAxiosPrivate();

    const RegisterModalContainerRef = useDetectClickOutside({
        onTriggered: () => {
            dispatch(hideRightClickMouseMenu())
        },
    })

    // deleting files:
    // delete from filesData
    // delete from localStorage

    // @ts-ignore
    const { auth, setAuth } = useAuth()

    //SEPARATOR
    const handleDelete = async (singleFileInFolderView: ISingleFileInFolderView) => {
        var deleteFileIdx = folderStructure.findIndex((el: any) => singleFileInFolderView.fileId === el.fileId)
        var depth = singleFileInFolderView.depth

        // get indexes of files to delete (important for folders, with files will be a single index) 
        var counter = deleteFileIdx + 1
        while (counter < folderStructure.length) {
            if (folderStructure[counter].depth <= depth) {
                break
            }
            counter++
        }

        // modify folderStructure
        var newFolderStructure = [...folderStructure.slice(0, deleteFileIdx), ...folderStructure.slice(counter, folderStructure.length)]
        var deletedFiles = [...folderStructure.slice(deleteFileIdx, counter)]
        deletedFiles = deletedFiles.filter((el: any) => el.fileType === 'file')
        var deletedFilesIds = deletedFiles.map((el: any) => el.fileId)

        // DON'T DELETE FILESDATA BECAUSE WE HAVE A PROBLEM WITH CODEEDITOR STATES (FIGURE IT OUT LATER)
        // WHEN REFRESHED WE STILL LOSE THIS DATA, BECAUSE WHEN TAKING DATA FROM SERVER WE DON'T HAVE THIS FILE ANYMORE AND FILESDATA AND LS IS OVERWRITTEN
        // delete from filesData state
        // var _filesData = _.cloneDeep(filesData)
        // for (var deletedFile of deletedFiles) {
        //     delete _filesData[deletedFile.fileId]
        // }
        // _filesData = _.cloneDeep(_filesData)

        // send data to server
        try {
            const response = await axiosPrivate({
                method: 'post',
                url: `/deleteFiles`,
                data: {
                    email: auth.email,
                    folderStructure: newFolderStructure,
                    deletedFilesIds: deletedFilesIds
                },
            })
            if (response.status === 200) {
                // change states and localStorage only after you delete files in database
                dispatch(setFolderStructure(newFolderStructure))
                // dispatch(setFilesData(_filesData))

                // delete from localStorage
                var _localStorageFilesData = JSON.parse(window.localStorage.getItem("filesData")!)
                delete _localStorageFilesData[singleFileInFolderView.fileId]
                window.localStorage.setItem("filesData", JSON.stringify(_localStorageFilesData))

                // remove all tabs
                const { change, data, localStorageAction } = removeTab(deletedFiles, openFiles, focusedEditor)
                if (change) {
                    dispatch(setOpenFiles(data))
                    if (localStorageAction === "remove") {
                        window.localStorage.removeItem("openFiles")
                    }
                    if (localStorageAction === "set") {
                        saveOpenFilesToStorage(data)
                    }
                }

                var _alertData: any = alertData
                var newId = generateUUIDWithoutDashed()
                _alertData[newId] = { msg: "File has been deleted", id: newId }
                _alertData = _.cloneDeep(_alertData)
                dispatch(setAlertData(_alertData))
            }
        } catch (err) {
            var _alertData: any = alertData
            var newId = generateUUIDWithoutDashed()
            _alertData[newId] = { msg: "File deletion failed", id: newId }
            _alertData = _.cloneDeep(_alertData)
            dispatch(setAlertData(_alertData))
        }
        // close the menu
        dispatch(hideRightClickMouseMenu())
    }

    const createNewFile = (singleFileInFolderView: ISingleFileInFolderView, fileType: "file" | "folder") => {
        // get file index of the file clicked, we insert input data after this file to folderStructure
        var fileIdx = folderStructure.findIndex((q: any) => q.fileId === singleFileInFolderView.fileId)

        // setting the path for new file
        // later, when i have a file name, append it to file
        var currentPrePath: string = ''
        if (singleFileInFolderView.fileType === "folder") {
            currentPrePath = singleFileInFolderView.filePath
        }
        if (singleFileInFolderView.fileType === "file") {
            var tempPath = singleFileInFolderView.filePath.split("/")
            tempPath.pop()
            currentPrePath = tempPath.join("/")
        }

        var _depth;
        singleFileInFolderView.fileType === "folder" ? _depth = singleFileInFolderView.depth + 1 : _depth = singleFileInFolderView.depth
        var inputData: ISingleFileInFolderView = { fileName: "", filePath: currentPrePath, depth: _depth, fileType: fileType, fileId: generateUUIDWithoutDashed(), collapsed: false, visible: false, fieldType: "input" }


        var _folderStructure = folderStructure
        _folderStructure = insert(_folderStructure, fileIdx + 1, inputData)
        _folderStructure = _.cloneDeep(_folderStructure)

        dispatch(enableAddingFileOrFolderFromWorkspace())
        dispatch(hideRightClickMouseMenu())
        dispatch(setFolderStructure(_folderStructure))
    }




    return (
        <S.PopUpWindowContainer top={top} left={left} ref={RegisterModalContainerRef}>
            <S.SingleItem disabled={false}>
                <S.Text onClick={(e) => {
                    e.stopPropagation()
                    createNewFile(data, "file")
                }}> New file</S.Text>
            </S.SingleItem>

            <S.SingleItem disabled={false}>
                <S.Text onClick={(e) => {
                    e.stopPropagation()
                    createNewFile(data, "folder")
                }}> New folder</S.Text>
            </S.SingleItem>

            <S.SingleItem disabled={false}>
                <S.Text onClick={() => {
                    handleDelete(data)
                }}>Delete</S.Text>
            </S.SingleItem>



        </S.PopUpWindowContainer>
    )
};

export default MouseClickMenu;
