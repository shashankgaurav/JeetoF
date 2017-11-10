import { SPLASH_SCREEN } from '../constants';

export const splashReducer = (state = [], action) => {
  let responseMeta = null;
  switch (action.type) {
    case SPLASH_SCREEN:
      return state;

    case 'SPLASH_SCREEN_SET':
    console.log("in reducer");
      responseMeta=action.responseMetaData;
      console.log(responseMeta);
      return responseMeta;

    default:
      return state;
  }
}
