import styled from 'styled-components'

export const TopPopupMenu = styled.div`
  cursor: default;
  user-select: none;
  width: 108px;
  height: 110px;
  position: absolute;
  top: 33px;
  right: -80px;
  background: rgb(41, 39, 53);
  border: 1px solid rgb(84, 82, 94);
  z-index: 500;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 4px;
`

interface ITopPopupMenuItem {
  disabled: boolean
}

export const TopPopupMenuItem = styled.div<ITopPopupMenuItem>`
  display: flex;
  align-items: center;
  height: 26px;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: ${(props) => (props.disabled ? 'gray' : 'auto')};

  &:hover {
    background-color: ${(props) => (props.disabled ? '' : `rgb(0, 106, 189)`)};
    border-radius: 3px;
  }
`
interface IChecked {
  checked: boolean
}

export const Checked = styled.div<IChecked>`
  width: 20px;
  ::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    /* content: '\f00c'; */
    content: ${(props) => (props.checked ? "'\f00c'" : '')};
    font-size: 9px;
    padding-right: 6px;
    padding-left: 6px;
  }
`
