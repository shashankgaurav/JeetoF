import { MANUAL_LOGIN_SUBMIT } from '../constants';

export const submitLoginForm = (loginData) => {
    return {
        type: 'MANUAL_LOGIN_SUBMIT',
        loginData
    }

}
