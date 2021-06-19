import { STATUS } from 'shared/redux/const';

const status = {
  playListStatus: false,
  loginStatus: false,
  contentStatus: false,
  menuName: '/',
  extendSideBarStatus: false,
  createPlayList: false
}

export default function statusReducer(state = status, action: any) {
  switch (action.type) {
    case STATUS.PLAY_LIST_STATUS:
      return { ...state, playListStatus: action.status }
    case STATUS.LOGIN:
      return { ...state, loginStatus: action.status }
    case STATUS.CONTENT_CHANGE:
      return { ...state, contentStatus: action.status }
    case STATUS.MENU_NAME:
      return { ...state, menuName: action.name }
    case STATUS.EXTEND_SIDE_BAR:
      return { ...state, extendSideBarStatus: action.status }
    case STATUS.CREATE_PLAY_LIST:
      return { ...state, createPlayList: action.status }
    default:
      return state;
  }
}