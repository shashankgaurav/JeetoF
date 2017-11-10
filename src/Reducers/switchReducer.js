import { SWITCH_ACTION } from '../constants';

export const switchReducer = (state = [], action) => {
  let screenPanel = null;
  switch (action.type) {
    case 'SWITCH_ACTION':
      screenPanel=[action.screenData];
      return screenPanel;

      case 'SWITCH_SCREEN':
      let SUCCESS = {SUCCESS : action.screenDisplay}
      screenPanel=[SUCCESS];
      return screenPanel;

    default:
      return state;
  }
}
