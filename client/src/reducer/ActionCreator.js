const actionCreators = {
    USER: "USER",
    SALDO: "SALDO",
    RECARGA: "RECARGA",
    CONTACTOS: "CONTACTOS",
    TRANSACCIONES: "TRANSACCIONES",
    HUELLA: "HUELLA",
    USER_IMAGE: 'USER_IMAGE',
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