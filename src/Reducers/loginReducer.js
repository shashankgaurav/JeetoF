import { ADD_USER, DELETE_USER, DELETE_ALL } from '../constants'
const username = action => {
  let { user } = action
  return {
    id: Math.random(),
    user
  }
}

const removeById = (state = [], id) => {
  const users = state.filter(users => users.id !== id)
  return users
}

export const loginReducer = (state = [], action) => {
  let users = null
  switch (action.type) {
    case ADD_USER:
      console.log('Inside ADD_USER')
      users = [...state, username(action)]
      return users

    case DELETE_USER:
      users = removeById(state, action.id)
      return users

    case DELETE_ALL:
      users = []
      return users

    default:
      return state
  }
}
