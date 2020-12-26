const date = new Date();
let dayMonth = date.getDate()
// let dayMonth = 23;
let day = date.getDay()
let currentYear = date.getFullYear();
let month = date.getMonth()

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
    if (dayMonth === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) return 31;
    else if (month == 3 || month == 5 || month == 8 || month == 10) return 30
    else return esBiciesto() ? 29 : 28;
}
const esBiciesto = () => {
    return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0))
}

const ultimoMes = () => {
    if (month !== 0) {
        month--;
    } else {
        month = 11;
        // month--;
    }
}

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

    let array7Dias
    let final;
    // console.log("EL DAYMONTH ES ", dayMonth)
    if ((dayMonth - 6) >= 0) {
        array7Dias = newArray && newArray.filter(pasa =>
            pasa.createdAt[2] >= (dayMonth - 6))

    } else {
        let arrayDiasRestantes = newArray.filter(pasa => pasa.createdAt[2] <= dayMonth)
        --month;
        if (month < 0) {
            ultimoMes()
        }
        imprimeDias()
        let anterior = MesesEscritos[arrayMeses[month]]
        final = anterior.slice(array.length + (daymonth - 7), array.length)

        let arrayDiasFaltantes = newArray.filter(pasa =>
            pasa.createdAt[2] >= final[0] && pasa.createdAt[1] == month)

        array7Dias = arrayDiasFaltantes.concat(arrayDiasRestantes)

    }
    let arraySun, arrayMon, arrayTue, arrayWed, arrayThu, arrayFri, arraySat = []
    if ((dayMonth - 6) >= 0) {

        arraySun = array7Dias && array7Dias.filter(pasa =>
            pasa.createdAt[2] == (dayMonth - 6))
        arrayMon = array7Dias && array7Dias.filter(pasa =>
            pasa.createdAt[2] == (dayMonth - 5))
        arrayTue = array7Dias && array7Dias.filter(pasa =>
            pasa.createdAt[2] == (dayMonth - 4))
        arrayWed = array7Dias && array7Dias.filter(pasa =>
            pasa.createdAt[2] == (dayMonth - 3))
        arrayThu = array7Dias && array7Dias.filter(pasa =>
            pasa.createdAt[2] == (dayMonth - 2))
        arrayFri = array7Dias && array7Dias.filter(pasa =>
            pasa.createdAt[2] == (dayMonth - 1))
        arraySat = array7Dias && array7Dias.filter(pasa =>
            pasa.createdAt[2] == dayMonth)
    } else {
        arraySun = array7Dias && array7Dias[0]
        arrayMon = array7Dias && array7Dias[1]
        arrayTue = array7Dias && array7Dias[2]
        arrayWed = array7Dias && array7Dias[3]
        arrayThu = array7Dias && array7Dias[4]
        arrayFri = array7Dias && array7Dias[5]
        arraySat = array7Dias && array7Dias[6]
    }

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