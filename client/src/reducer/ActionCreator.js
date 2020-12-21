import axios from 'axios';

const actionCreators = {
    USER: "USER",
    SALDO: "SALDO",
    EFECTIVO: "EFECTIVO",
    RECARGA: "RECARGA",
    CONTACTOS: "CONTACTOS",
    getME: function(id){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
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