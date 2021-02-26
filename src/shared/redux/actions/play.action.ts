import { PLAY } from 'shared/redux/const';

export function setPlayAction(status: boolean) {
  return {
    type: PLAY,
    status
  }
} 
