import { USER } from 'shared/redux/const';

const userState = {
  albums: []
}

export default function userReducer(state = userState, action: any) {
  switch(action.type) {
    case USER.LOAD_ALBUM: 
      return {...state, albums: action.albums}
    default:
      return state;
  }
}