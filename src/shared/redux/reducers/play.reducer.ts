import { PLAY } from 'shared/redux/const';

export default function setPlayReducer(state = false, action: any) {
  switch(action.type) {
    case PLAY: 
      return action.status
    default:
      return state;
  }
}