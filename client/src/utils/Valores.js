const date = new Date();
// let dayMonth = date.getDate()
let dayMonth = 1;
let day = date.getDay()
let currentYear = date.getFullYear();
let month = date.getMonth()

//  0 enero 11 diciembre
const arrayMeses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
let MesesEscritos = {
    enero: [],
    febrero: [],
    marzo: [],
    abril: [],
    mayo: [],
    junio: [],
    julio: [],
    agosto: [],
    septiembre: [],
    octubre: [],
    noviembre: [],
    diciembre: []
}

const imprimeDias = () => {
    for (let i = 1; i <= totalDays(month); i++) {
        if (month == 0) MesesEscritos.enero.push(i)
        if (month == 1) MesesEscritos.febrero.push(i)
        if (month == 2) MesesEscritos.marzo.push(i)
        if (month == 3) MesesEscritos.abril.push(i)
        if (month == 4) MesesEscritos.mayo.push(i)
        if (month == 5) MesesEscritos.junio.push(i)
        if (month == 6) MesesEscritos.julio.push(i)
        if (month == 7) MesesEscritos.agosto.push(i)
        if (month == 8) MesesEscritos.septiembre.push(i)
        if (month == 9) MesesEscritos.octubre.push(i)
        if (month == 10) MesesEscritos.noviembre.push(i)
        if (month == 11) MesesEscritos.diciembre.push(i)
    }
}

const totalDays = (month) => {
    if(dayMonth === -1) month = 11;

    if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) return 31;
    else if(month == 3 || month == 5 || month == 8 || month == 10) return 30
    else return esBiciesto() ? 29 : 28;
}
const esBiciesto = () => {
    return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0))
}

// const ComienzoDelDia = () => {
//     let start = new Date(currentYear, dayMonth, 1);
//     return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
// }
const ultimoMes = () => {
    if(month !== 0){
        month--;
    }else {
        month = 11;
        month--;
    }
    imprimeDias()
}

// const proximoMes = () => {
//     if(month !== 11){
//         month++;
//     }else{
//         month = 0;
//         currentYear++;
//     }
//     imprimeDias()
// }

export const SieteDias = (todo) => {
    let Sun = 0;
    let Mon = 0;
    let Tue = 0;
    let Wed = 0;
    let Thu = 0;
    let Fri = 0;
    let Sat = 0;
    let Acc1 = 0;
    let Acc2 = 0;
    let Acc3 = 0;
    let Acc4 = 0;
    let Acc5 = 0;
    let Acc6 = 0;
    let Acc7 = 0;
    let newArray = todo && todo.transactions

    // Debe tomar los 7 dias anteriores para hacer el filtro, 26 - 6
    // Si estamos a 1 de enero, debe tomar 7 dias anteriores
    // Osea tomar desde el 27 de diciembre hasta el 1 de enero.
    // Debo comparar el createdAt[1] contra el mes anterior.
    // llamar a la funcion de imprimeDias. y acceder ahora a sus propiedades.
    // if(newArray.createdAt[1] >= (dayMonth - 6) >= 0){
    //     let array7Dias = newArray && newArray.filter(pasa =>
    //         pasa.createdAt[2] >= (dayMonth - 6))  
    // }else if(){

    // }
    let array7Dias
    console.log("EL DAYMONTH ES ", dayMonth)
    if((dayMonth - 6) >= 0){
        array7Dias = newArray && newArray.filter(pasa =>
            pasa.createdAt[2] >= (dayMonth - 6))  
    }else {
        if(month < 0){
            ultimoMes()
        }
        
        --month;
        imprimeDias()
        let anterior = MesesEscritos[arrayMeses[month]]
        console.log(anterior)

    }
      

    let arraySun = array7Dias && array7Dias.filter(pasa =>
        pasa.createdAt[2] == (dayMonth - 6))
    let arrayMon = array7Dias && array7Dias.filter(pasa =>
        pasa.createdAt[2] == (dayMonth - 5))
    let arrayTue = array7Dias && array7Dias.filter(pasa =>
        pasa.createdAt[2] == (dayMonth - 4))
    let arrayWed = array7Dias && array7Dias.filter(pasa =>
        pasa.createdAt[2] == (dayMonth - 3))
    let arrayThu = array7Dias && array7Dias.filter(pasa =>
        pasa.createdAt[2] == (dayMonth - 2))
    let arrayFri = array7Dias && array7Dias.filter(pasa =>
        pasa.createdAt[2] == (dayMonth - 1))
    let arraySat = array7Dias && array7Dias.filter(pasa =>
        pasa.createdAt[2] == dayMonth)

    if (arraySun !== undefined) {
        arraySun.map(el => {
            if (el.type === "ingreso") {
                Sun += el.total
            } else {
                Sun -= el.total
            }
        })
    }
    Acc1 = Sun
    if (arrayMon !== undefined) {
        arrayMon.map(el => {
            if (el.type === "ingreso") {
                Mon += el.total
            } else {
                Mon -= el.total
            }
        })
    }
    Acc2 = (Acc1 + Mon)
    if (arrayTue !== undefined) {
        arrayTue.map(el => {
            if (el.type === "ingreso") {
                Tue += el.total
            } else {
                Tue -= el.total
            }
        })
    }
    Acc3 = (Acc2 + Tue)
    if (arrayWed !== undefined) {
        arrayWed.map(el => {
            if (el.type === "ingreso") {
                Wed += el.total
            } else {
                Wed -= el.total
            }
        })
    }
    Acc4 = (Acc3 + Wed)
    if (arrayThu !== undefined) {
        arrayThu.map(el => {
            if (el.type === "ingreso") {
                Thu += el.total
            } else {
                Thu -= el.total
            }
        })
    }
    Acc5 = (Acc4 + Thu)
    if (arrayFri !== undefined) {
        arrayFri.map(el => {
            if (el.type === "ingreso") {
                Fri += el.total
            } else {
                Fri -= el.total
            }
        })
    }
    Acc6 = (Acc5 + Fri)
    if (arraySat !== undefined) {
        arraySat.map(el => {
            if (el.type === "ingreso") {
                Sat += el.total
            } else {
                Sat -= el.total
            }
        })
    }
    Acc7 = (Acc6 + Sat)
    return [Acc1, Acc2, Acc3, Acc4, Acc5, Acc6, Acc7]
}