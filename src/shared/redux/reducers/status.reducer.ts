import { STATUS } from 'shared/redux/const';

const status = {
  playListStatus: false,
  loginStatus: false
}

export default function statusReducer(state = status, action: any) {
  switch (action.type) {
    case STATUS.PLAY_LIST_STATUS:
      return { ...state, playListStatus: action.status }
    case STATUS.LOGIN:
      return { ...state, loginStatus: action.status }
    default:
      return state;
  }
}