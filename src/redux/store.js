import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer, rootSaga } from './reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'] 
}


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const Store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);
export const Persistor = persistStore(Store);

sagaMiddleware.run(rootSaga);
