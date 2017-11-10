import { PAY_TABLE } from '../constants';

export const payTableReducer = (state = [], action) => {
  let payTable = [];
  switch (action.type) {

    case PAY_TABLE:
      payTable=action.payload;
      return payTable;

    default:
      return state;
  }
}
