import {call,put,takeEvery, takeLatest} from 'redux-saga/effects';
import * as ActionTypes from '../actionTypes'

export function* fetchCurrenciesSaga(payload) {
    const response = yield fetch('http://data.fixer.io/api/latest?access_key=bf814f3a96d4775b21263ef91dcd13b3', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
         'Content-Type': 'application/json',
        }
      })
    const data = yield response.json()

    if(data.success){
      var currencies= []
      for (const [key, value] of Object.entries(data.rates)) {
          currencies.push({[key]:value,fav:false})
      }
    }

    yield put({type: ActionTypes.GET_CURRIENCIES, payload: currencies})
}

export function* watchGetCurrencies() {
  yield takeEvery(ActionTypes.GET_CURRIENCIES_ACTION, fetchCurrenciesSaga)
}



// export function* fetchCurrenciesSaga(payload) {
//   const response = yield fetch('http://data.fixer.io/api/latest?access_key=bf814f3a96d4775b21263ef91dcd13b3', {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//        'Content-Type': 'application/json',
//       }
//     })
//   const data = yield response.json()

//   if(data.success){
//     var currencies= []
//     for (const [key, value] of Object.entries(data.rates)) {
//         currencies.push({[key]:value,fav:false})
//     }
//   }

//   yield put({type: ActionTypes.GET_CURRIENCIES, payload: currencies})
// }

// export function* watchGetCurrencies() {
// yield takeEvery(ActionTypes.GET_CURRIENCIES_ACTION, fetchCurrenciesSaga)
// }


