// AppContainer
interface AppContainerProps {
  commandPaletteOpened: boolean
}

// Alert

interface AlertProps {
  text: string
  id: string
}

// AccountsPopUp

interface AccountsPopUpProps {
  bottom: number
  left: number
}

// PopupLevel1

interface PopupLevel1Props {
  bottom: number
  right: number
}

// GithubLink

interface GithubLinkProps {
  url: string
}

// ActivityBar
interface ActivityBarProps {}

// Breadcrums
interface BreadCrumsProps {
  file_path: string
  meta: any
}

// CodeEditor
interface CodeEditorProps {
  editorId: number
}

// Cursor
interface CursorProps {
  left: string
  color: string
  mode: string
}

// Line
interface LineProps {
  key: number
  idx: number
  x: number
  y: number
  mode: string
  children: any
}

// ScrollBarInfo
interface ScrollBarInfoProps {
  height: string
}

// Tab
interface TabsProps {
  editorId: number
}

// TabsRightMenu
interface TabsRightMenuProps {
  text: string
  filePath: any
}

// Title
interface TitleProps {
  text: string
}

// MouseClickMenu
interface MouseClickMenuProps {
  top: number
  left: number
  data: ISingleFileInFolderView
}
