import actionCreators from './ActionCreator';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
const { USER, SALDO, RECARGA, CONTACTOS, TRANSACCIONES } = actionCreators;

const initialState = {
    user: false,
    saldo: 0,
    recarga: {},
    contactos: false,
    transacciones: false
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
        default:
            return {...state}
    }
}
export default function generateStore() {
    const store = createStore(
      reducer,
      applyMiddleware(thunk)
    );
    return store;
  }