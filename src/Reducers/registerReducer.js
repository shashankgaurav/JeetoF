import { REGISTER_USER, FETCH_ERROR ,REGISTER_USER_SUCCESS} from '../constants';
import {bake_cookie, read_cookie} from 'sfcookies';
export const registerReducer = (state = [], action) => {
  let users = []
  switch (action.type) {
    case 'REGISTER_USER':
      users = [...state]
      return users

    case 'FETCH_ERROR':
      users = [action.error]
      return users

    case 'REGISTER_USER_SUCCESS':
    console.log('REGISTER_USER_SUCCESS');
      users = [action.signupdata.data, action.SUCCESS]
      const userdetailsStore = {
        master_players_id: action.signupdata.data.data.master_players_id,
        is_phone_verified: action.signupdata.data.data.is_phone_verified,
        firstUserExperience: action.signupdata.data.data.firstUserExperience,
        Stage: action.signupdata.data.data.Stage,
        header: action.signupdata.headers,
        register: 'signup'
      }
      console.log(userdetailsStore);
      bake_cookie('cookeiesdata', {userdetailsStore})
      console.log(users);
      return users

    default:
      return state
  }
}
