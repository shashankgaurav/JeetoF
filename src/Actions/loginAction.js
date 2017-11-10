import {ADD_USER, DELETE_USER, DELETE_ALL} from '../constants';

export const addUser = (userName) => {
   const action = {
     type: ADD_USER,
     userName
   }
   return action;
}

export const deleteUser = (id) => {
   const action = {
     type: DELETE_USER,
     id
   }
   return action;
}

export const deleteAll = () => {
   const action = {
     type: DELETE_ALL

   }
   return action;
}
