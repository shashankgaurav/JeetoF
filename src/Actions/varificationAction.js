import { PHONE_NUMBER_SUBMIT, GENERATE_OTP, VERIFY_OTP,PHONE_CHANGE_REQUEST_SUBMIT} from '../constants';

export const submitPhoneForm = (phoneNumber) => {
  return {
      type: 'PHONE_NUMBER_SUBMIT',
      phoneNumber
  }
}

export const generateOTP = (userdata) => {
  return {
      type: 'GENERATE_OTP',
      userdata
  }
}

export const submitOtpForm = (otpdata) => {
  console.log(otpdata);
  return {
      type: 'VERIFY_OTP',
      otpdata
  }
}
export const submitPhoneRequestForm = (phonechangedata) => {
  console.log(phonechangedata);
  return {
      type: 'PHONE_CHANGE_REQUEST_SUBMIT',
      phonechangedata
  }
}