export const diasDeSemana = (day) => {
    let arrayDias = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let NewArray = arrayDias.slice(0, day)
    let ArrayResultante = arrayDias.slice(day)

    return [].concat(ArrayResultante, NewArray)
}
export const diasMes = (dayMonth, month) => {
    return ["", `del ${dayMonth} / ${(month + 1) - 1}`, " al ", `dia ${dayMonth} / ${(month + 1)}` ]
}
export const seisMeses = (month) => {
    
    let arrayDias = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let newArray = []
    for(let i = 0; i < 6; i++){
        newArray.unshift(arrayDias[month])
        --month
        if(month < 0){
            month = 11;
        }
    }
    return newArray;
}
export const unAño = (month) => {
    
    let arrayDias = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let newArray = []
    for (let i = 0; i < 12; i++) {
        newArray.unshift(arrayDias[month])
        --month
        if (month < 0) {
            month = 11;
        }
    }
    return newArray;
}