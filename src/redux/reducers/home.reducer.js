import * as ActionTypes from '../actionTypes';
import { base, darkTheme, lightTheme, colorOptions } from "../../utils/Colors";

const initData = {
  loading: false,
  theme: { ...base, ...darkTheme, ...colorOptions.blue },
};

const homeReducer = (state = initData, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    case ActionTypes.CHANGE_BASE_THEME:
      return {
        ...state,
        theme: { ...state.theme, ...action.baseTheme }
      };
    case ActionTypes.CHANGE_COLOR_THEME:
      return {
        ...state,
        theme: { ...state.theme, PRIMARY_BACKGROUND_COLOR: action.colorTheme }
      };

    default:
      return state;
  }
};

export default homeReducer;
