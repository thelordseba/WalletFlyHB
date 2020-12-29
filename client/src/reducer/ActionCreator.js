import axios from 'axios';
import { APP_API } from "../../env";

const actionCreators = {
    USER: "USER",
    SALDO: "SALDO",
    RECARGA: "RECARGA",
    CONTACTOS: "CONTACTOS",
    TRANSACCIONES: "TRANSACCIONES",
    getME: function(id){
        return dispatch => {
            // const promise = axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
            const promise = axios.get(`http://${APP_API}/users/${id}`)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    // dispatch
    _dispatchPromise: function(promise, type, dispatch){
        return promise
        .then(({data}) => {
            dispatch({type: type, payload: data});
        })
        .catch(err =>{
            if(err.response){
                alert(`Error! \n Status: ${err.response.status}
                \n ${err.response.data}`)
            }else{
                alert(`Error! ${err}`);
            }
        })
    },
}

export default actionCreators;