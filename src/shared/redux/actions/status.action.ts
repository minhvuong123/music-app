import { STATUS } from 'shared/redux/const';

export function setPlayListStatus(status: boolean) {
  return {
    type: STATUS.PLAY_LIST_STATUS,
    status
  }
} 

export function setLoginStatus(status: boolean) {
  return {
    type: STATUS.LOGIN,
    status
  }
} 