import {REGISTER_USER} from '../constants';

export const registerData = (regData) => {
    const action = {
      type: REGISTER_USER,
      regData
    }
    return action;
 }
 