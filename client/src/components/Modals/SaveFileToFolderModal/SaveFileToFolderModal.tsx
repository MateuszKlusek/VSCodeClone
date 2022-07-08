// react
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react"

// hooks
import { useDetectClickOutside } from "react-detect-click-outside";
import { useDispatch, useSelector } from "react-redux";
import { setFolderStructure, setOpenFiles } from "../../../actions";

// action
import { hideSaveFileToFolderModal } from "../../../actions/popupsModals";
import { removeTab } from "../../../helpers/data";
import { filterFileIcon } from "../../../helpers/icons";
import { saveOpenFilesToStorage } from "../../../helpers/storage";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { insert, sortFolderStructure } from "../../../utils/Misc/misc";

// styles
import * as S from "./SaveFileToFolderModal.styled"

const SaveFileToFolderModal = () => {
    const dispatch = useDispatch()

    const [inputFileName, setInputFileName] = useState<string>("")
    // @ts-ignore
    const { auth, setAuth } = useAuth()



    const folderStructure = useSelector<any, any>(state => state.folderStructure)
    const filesData = useSelector<any, any>(state => state.filesData)
    const openFiles = useSelector<any, any>(state => state.openFiles)
    const focusedEditor = useSelector<any, any>(state => state.focusedEditor)

    const axiosPrivate = useAxiosPrivate();



    const InputRef = useRef<HTMLInputElement>(null)

    // set focus to input when component is mounted
    useEffect(() => {
        if (InputRef.current) InputRef.current.focus()
    }, [])


    const handleClick = async (file: any, idx: any) => {

        // find all the files with type="file" in the clicked and check for possible duplicate name
        var duplicateNameInFolder = false
        var currentDepth = file.depth
        for (var i = idx + 1; i < folderStructure.length; i++) {
            if (folderStructure[i].depth === currentDepth + 1) {
                if (folderStructure[i].fileName === inputFileName) {
                    duplicateNameInFolder = true
                    break
                }
            } else {
                break
            }
        }


        if (file.fileType === "folder" && inputFileName !== "" && !duplicateNameInFolder) {
            var fileDataWithFocusedFileId = openFiles.editors[focusedEditor].data.filter((el: any) => el.focused === true)
            var fileId = fileDataWithFocusedFileId[0].fileId
            var focusedFileData = filesData[fileId]
            var fileDataToInsert: ISingleFileInFolderView = {
                fileName: inputFileName,
                filePath: `${file.filePath}/${inputFileName}`,
                depth: file.depth + 1,
                fileType: 'file',
                fileId: focusedFileData.fileId,
                collapsed: false,
                visible: true,
                fieldType: "file"

            }

            // find that "picked" file and after if paste 
            var _folderStructure = folderStructure
            var fileIdx = folderStructure.findIndex((q: any) => q.fileId === file.fileId)
            _folderStructure = insert(_folderStructure, fileIdx + 1, fileDataToInsert)


            // getting file data from localStorage from fileId
            var filesDataFromStorage = JSON.parse(window.localStorage.getItem("filesData")!)
            var currentFileData = filesDataFromStorage[fileId]
            var currentFileTokenizedText = currentFileData.tokenizedText
            var text_before_stringification = []
            for (var line of currentFileTokenizedText) {
                var temp = ''
                for (var el of line) {
                    if (el.type === "string") {
                        temp += `"${el.value}"`
                    }
                    else {
                        temp += el.value
                    }
                }
                text_before_stringification.push(temp)
            }
            // double stringify text
            var stringifiedObject = (JSON.stringify(text_before_stringification))



            // save folderStructure to server (files)
            // save this file fileData to server 
            // save this fileId to server (fileId) 

            const singleFileInFilesInServer: ISingleFileInFilesInServer = {
                created_at: new Date(),
                text: stringifiedObject,
                updated_at: new Date(),
                fileId: fileDataToInsert.fileId,
                filePath: fileDataToInsert.filePath,
                fileName: fileDataToInsert.fileName,
            }

            const { sortedFolderStructure } = sortFolderStructure(_folderStructure)
            _folderStructure = _.cloneDeep(sortedFolderStructure)
            //////////////////////////////////////////////
            // save new file to server axios
            try {
                const response = await axiosPrivate({
                    method: 'post',
                    url: `/saveNewFile`,
                    data: {
                        email: auth.email,
                        singleFileInFilesInServer,
                        folderStructure: sortedFolderStructure,
                    }
                })
                if (response.status === 200) {

                    const { change, data, localStorageAction } = removeTab([focusedFileData], openFiles, focusedEditor)
                    if (change) {
                        dispatch(setOpenFiles(data))
                        if (localStorageAction === "remove") {
                            window.localStorage.removeItem("openFiles")
                        }
                        if (localStorageAction === "set") {
                            saveOpenFilesToStorage(data)
                        }
                    }
                    dispatch(setFolderStructure(sortedFolderStructure))
                    dispatch(hideSaveFileToFolderModal())
                }
            }
            catch (err) {
                console.log(err)
            }

        }
    }



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


    // handle click outside the component
    const RegisterModalContainerRef = useDetectClickOutside({
        onTriggered: () => {
            dispatch(hideSaveFileToFolderModal())
        },
    })

    return <S.SaveFileToFolderModalContainer ref={RegisterModalContainerRef}>
        <S.Title>Pick a folder</S.Title>
        <S.InputContainer>
            <S.Input onChange={(e) => setInputFileName(e.target.value)} placeholder={"name your file"} ref={InputRef} />
        </S.InputContainer>
        <S.A >
            {folderStructure.map((el: ISingleFileInFolderView, idx: any) => (
                <S.S
                    paddingLeft={el.depth}
                    key={idx}
                    onClick={() => {
                        handleClick(el, idx)
                    }}
                    backgroundColor={highlightFileFromTabs(el)}
                    visible={true}
                    opacity={el.fileType === "folder" ? 1 : 0.2}
                >
                    {el.fileType === "folder" && < S.Chevron collapsed={el.collapsed} />}
                    <S.Icon src={filterFileIcon(el)} />
                    <S.Text>{el.fileName}</S.Text>
                </S.S>
            ))}
        </S.A>

    </S.SaveFileToFolderModalContainer>;
};

export default SaveFileToFolderModal;
