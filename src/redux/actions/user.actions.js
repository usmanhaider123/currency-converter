
import * as ActionTypes from '../actionTypes'

export const updateLoginState = (data) => ({
    type: ActionTypes.UPDATE_LOGIN_STATES,
    payload: data,
});

export const addtofav = (data) => ({
    type: ActionTypes.ADD_TO_FAVS,
    payload: data,
});

export const getCurrencies = (data) => ({
    type: ActionTypes.GET_CURRIENCIES_ACTION,
    payload:data
});

export const updateBase = (data) => ({
    type: ActionTypes.UPDATE_BASE,
    payload: data,
});

export const updateExchange = (data) => ({
    type: ActionTypes.UPDATE_EXCHANGE,
    payload: data,
});


export const reverseCurrencies = (data) => ({
    type: ActionTypes.REVERSE_CURRENCIES,
    payload: data,
});
