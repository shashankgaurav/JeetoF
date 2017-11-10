import { EMAIL_CHANGE_SUBMIT,EMAIL_VERIFY_SUCCESS} from '../constants'

export const emailVerifySubmit = emailChangeData => {
  console.log('action', emailChangeData)
  const action = {
    type: EMAIL_CHANGE_SUBMIT,
    emailChangeData
  }
  return action

  const action1 = {
    type: EMAIL_CHANGE_SUBMIT,
    emailChangeData
  }
  return action1
}
