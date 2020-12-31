import actionCreators from './ActionCreator';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';

const { USER, SALDO, RECARGA, CONTACTOS, TRANSACCIONES, HUELLA } = actionCreators;

const initialState = {
    user: false,
    saldo: 0,
    recarga: {},
    contactos: false,
    transacciones: false,
    huella: {}
}

const reducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case USER:
            return {
                ...state,
                user: action.payload
            }
        case SALDO:
            return {
                ...state,
                saldo: action.payload
            }
        case RECARGA: 
            return {
                ...state,
                recarga: action.payload
            }
        case CONTACTOS: 
            return {
                ...state,
                contactos: action.payload
            }
        case TRANSACCIONES:
            return {
                ...state,
                transacciones: action.payload
            }
        case HUELLA:
            return {
                ...state,
                huella: action.payload
            }
        default:
            return {...state}
    }
}

export default () => {
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        // whitelist: ['reducer']
    }
    const persistedReducer = persistReducer(persistConfig, reducer)
    
    const store = createStore(
        persistedReducer,
        applyMiddleware(thunk, createLogger())
    );
    const persistor = persistStore(store)
    return { store, persistor }
}
  