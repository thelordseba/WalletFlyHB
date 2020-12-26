export const diasDeSemana = (day) => {
    let arrayDias = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let NewArray = arrayDias.slice(0, day)
    let ArrayResultante = arrayDias.slice(day)

    return [].concat(ArrayResultante, NewArray)
}
export const diasMes = () => {
    
}