import { SWITCH_ACTION, SWITCH_SCREEN } from '../constants';

export const switchAction = (screenData) => {
   const action = {
     type: SWITCH_ACTION,
     screenData
   }

   return action;
}

export const switchScreen = (screenDisplay) => {
  const action = {
    type: SWITCH_SCREEN,
    screenDisplay
  }
  return action;
}
