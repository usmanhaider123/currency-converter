import * as ActionTypes from '../actionTypes';

const initData = {
    user:{
      username:'',
      password:'',
      favouriteCurrencies:[],

    },
    currencies:[],
    baseCurrency:{},
    exchangeCurrency:{},


};

const user = (state = initData, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_LOGIN_STATES: {
      return {
        ...state,
        user: action.payload
      }
    }

    case ActionTypes.GET_CURRIENCIES: {
      return {
        ...state,
        currencies: action.payload,
        baseCurrency:action.payload[0],
        exchangeCurrency:action.payload[1],

      }
    }

    case ActionTypes.UPDATE_BASE: {
      return {
        ...state,
        baseCurrency:action.payload,
        
      }
    }
    case ActionTypes.UPDATE_EXCHANGE: {
      return {
        ...state,
        exchangeCurrency:action.payload,

      }
    }

    case ActionTypes.REVERSE_CURRENCIES: {
      return {
        ...state,
        baseCurrency:action.payload.base,
        exchangeCurrency:action.payload.exchange

      }
    }


    case ActionTypes.ADD_TO_FAVS: {
      return {
        ...state,
        currencies: action.payload
      }
    }
    default:
      return state;
  }
};

export default user;
