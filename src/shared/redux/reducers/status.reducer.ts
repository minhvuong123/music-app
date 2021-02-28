import { STATUS } from 'shared/redux/const';

const status = {
  playListStatus: false
}

export default function statusReducer(state = status, action: any) {
  switch(action.type) {
    case STATUS.PLAY_LIST_STATUS: 
      return {...state, playListStatus: action.status}
    default:
      return state;
  }
}