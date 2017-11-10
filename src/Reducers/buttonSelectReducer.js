import { BUTTON_SELECT,  ROOM_SELECT, CARD_SELECT}  from '../constants';

export const buttonSelectReducer = (state = [], action) => {
  let button = null;
  switch (action.type) {
    case BUTTON_SELECT:
      button =[action.buttonData];
      console.log(button);
      return button;

    default:
      return state;
  }
}

export const roomSelectReducer = (state = [], action) => {
  let room = [];
  switch (action.type) {
    case ROOM_SELECT:
        room = action.room;
        return room;

    default:
      return state;
  }
}

export const cardSelectReducer = (state = [], action) => {
  let card = [];
  switch (action.type) {
    case CARD_SELECT:
        card = action.cardData;
        return card;

    default:
      return state;
  }
}
