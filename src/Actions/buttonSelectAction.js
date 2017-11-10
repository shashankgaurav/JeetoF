import { BUTTON_SELECT, ROOM_SELECT, CARD_SELECT } from '../constants';

export const buttonSelect = (buttonData) => {
   const action = {
     type: BUTTON_SELECT,
     buttonData
   }
   return action;
}

export const roomSelect = (room) => {
   const action = {
     type: ROOM_SELECT,
     room
   }
   return action;
}

export const setcarddata = (cardData) => {
  console.log(cardData);
  const card = {
    type: CARD_SELECT,
    cardData
  }
  return card;
}
