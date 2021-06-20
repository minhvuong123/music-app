import { USER } from 'shared/redux/const';

const userState = {
  albums: []
}

export default function userReducer(state = userState, action: any) {
  switch(action.type) {
    case USER.LOAD_ALBUM: 
      return {...state, albums: action.albums}
    case USER.ADD_ALBUM: 
      return {...state, albums: [...state.albums, action.album]}
    default:
      return state;
  }
}