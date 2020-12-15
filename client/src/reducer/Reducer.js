import actionCreators from './ActionCreator';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
const { USER, EMAIL, USERDIRECTION } = actionCreators;

const initialState = {
    user: false,
    userDirection: false,
    email: ""
}

const reducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case USER:
            return {
                ...state,
                user: action.payload
            }
        case EMAIL: 
            return {
                ...state,
                email: action.payload
            }
        case USERDIRECTION: 
            return {
                ...state,
                userDirection: action.payload
            }
        default:
            return {...state}
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
export { store };