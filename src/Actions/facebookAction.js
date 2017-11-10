import {GET_FACEBOOK_REQUEST} from '../constants';

 // Action
export const getFacebookDetails = (payload) => {
    console.log(2);
  return {
    type: 'GET_FACEBOOK_REQUEST',
    payload
  }
  }
  