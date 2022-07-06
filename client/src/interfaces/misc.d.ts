// data about openFiles (fo tokenized text)
interface ISingleFileData {
  mode: string
  command: string
  x: number
  y: number
  fileName: string
  text: string
  fileId: string
  filePath: string
}

interface IOpenFiles {
  editors: Array<ISingleOpenEditor>
  metadata: {}
}

interface ISingleOpenEditor {
  editorId: number
  data: Array<ISingleEditorEntry>
}

// entry in openEditor
interface ISingleEditorEntry {
  fileName: string
  fileId: string
  filePath: string
  focused: boolean
}

// for workspace (basic folder view in explorer) and for the dropdown view in Breadcrums
interface ISingleFileInFolderView {
  fileName: string
  filePath: string
  depth: number
  fileType: 'file' | 'folder'
  fileId: string
  collapsed: boolean
  visible: boolean
  fieldType: string
}

// contains file text changes into tokenized pair of type and value
interface IFilesData {
  [x: string]: IFilesDataInside
}
type ITokenizedText = Array<
  Array<{
    type: string
    value: string
  }>
>

interface IFilesDataInside {
  x: number
  y: number
  mode: string
  command: string
  filePath: string
  fileName: string
  fileId: string
  text: Array<string>
  tokenizedText: ITokenizedText
  newFile: boolean
}

// miscellaneous settings
interface IMisc {
  numberOfOpened
}

//////////////////////////////////////////////////////////////////////////////////////
// for connection with server

// file in files for saving in server
interface ISingleFileInFilesInServer {
  created_at: Date
  text: string
  updated_at: Date
  fileId: string
  filePath: string
  fileName: string
}
