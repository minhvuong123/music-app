import { STATUS } from 'shared/redux/const';

const status = {
  playListStatus: false,
  loginStatus: false,
  contentStatus: false,
  menuName: '/'
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
    default:
      return state;
  }
}