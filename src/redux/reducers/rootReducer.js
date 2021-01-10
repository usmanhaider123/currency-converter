import { all } from 'redux-saga/effects';
import { watchGetCurrencies } from './sagas';
import { combineReducers } from 'redux';


import homeReducer from './home.reducer';
import user from './user.reducer';


export const rootReducer = combineReducers({
    home: homeReducer,
    user: user
});

export function* rootSaga() {
    yield all([watchGetCurrencies()]);
}