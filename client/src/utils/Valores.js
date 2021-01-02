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
const imprimeDias = (month, currentYear) => {
    for (let i = 1; i <= totalDays(month, currentYear); i++) {
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
const totalDays = (month, currentYear) => {

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) return 31;
    else if (month == 3 || month == 5 || month == 8 || month == 10) return 30
    else return esBiciesto(currentYear) ? 29 : 28;
}
const esBiciesto = (currentYear) => {
    return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0))
}
export const SieteDias = (todo, dayMonth, month, currentYear) => {

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
    let arraySun, arrayMon, arrayTue, arrayWed, arrayThu, arrayFri, arraySat = []

    if ((dayMonth - 6) >= 0) {
        array7Dias = newArray && newArray.filter(pasa =>
            pasa.createdAt[2] >= (dayMonth - 6) && pasa.createdAt[1] == (month + 1) && pasa.createdAt[0] == currentYear)

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

    }
    if (dayMonth - 5 < 0) {

        let arrayDiasRestantes = newArray.filter(pasa => pasa.createdAt[2] <= dayMonth)
        --month;
        if (month < 0) {
            month = 11;
            --currentYear;
        }
        imprimeDias(month, currentYear)
        let anterior = MesesEscritos[arrayMeses[month]]
        final = anterior.slice(anterior.length - (7 - dayMonth))
        let arrayDiasFaltantes = newArray.filter(pasa =>
            pasa.createdAt[2] >= final[0] && pasa.createdAt[1] == (month + 1) && pasa.createdAt[0] == currentYear)

        array7Dias = arrayDiasFaltantes.concat(arrayDiasRestantes)
        let numeroDeCorte = final[final.length - 1]

        let valorFiltro
        let valorFiltroPrimeroDias = 0
        let valor = 0
        let status = false
        arraySun = array7Dias.filter(el =>
            el.createdAt[2] == final[0])

        // 
        if (final[0] + 1 <= numeroDeCorte) {
            valorFiltro = final[0] + 1
        } else {
            if (valorFiltroPrimeroDias < 10) {
                valorFiltroPrimeroDias = "0" + (++valor)
            }
            status = true
        }

        arrayMon = status ?
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltroPrimeroDias)
            :
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltro)
        // 
        if (final[0] + 2 <= numeroDeCorte) {
            valorFiltro = final[0] + 2
        } else {
            if (valorFiltroPrimeroDias < 10) {
                valorFiltroPrimeroDias = "0" + (++valor)
            }
            status = true
        }
        arrayTue = status ?
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltroPrimeroDias)
            :
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltro)

        // 
        if (final[0] + 3 <= numeroDeCorte) {
            valorFiltro = final[0] + 3
        } else {
            if (valorFiltroPrimeroDias < 10) {
                valorFiltroPrimeroDias = "0" + (++valor)
            }
            status = true
        }
        arrayWed = status ?
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltroPrimeroDias)
            :
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltro)

        // 
        if (final[0] + 4 <= numeroDeCorte) {
            valorFiltro = final[0] + 4
        } else {
            if (valorFiltroPrimeroDias < 10) {
                valorFiltroPrimeroDias = "0" + (++valor)
            }
            status = true
        }
        arrayThu = status ?
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltroPrimeroDias)
            :
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltro)
        // 
        if (final[0] + 5 <= numeroDeCorte) {
            valorFiltro = final[0] + 5
        } else {
            if (valorFiltroPrimeroDias < 10) {
                valorFiltroPrimeroDias = "0" + (++valor)
            }
            status = true
        }
        console.log(valor)
        arrayFri = status ?
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltroPrimeroDias)
            :
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltro)
        // 
        if (final[0] + 6 <= numeroDeCorte) {
            valorFiltro = final[0] + 6
        } else {
            if (valorFiltroPrimeroDias < 10) {
                valorFiltroPrimeroDias = "0" + (++valor)
            }
            status = true
        }
        arraySat = status ?
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltroPrimeroDias)
            :
            array7Dias.filter(el =>
                el.createdAt[2] == valorFiltro)
    }

    arraySun && arraySun.map(el => {
        if (el.type === "ingreso") {
            Sun += el.total
        } else {
            Sun -= el.total
        }
    })
    Acc1 = Sun

    arrayMon && arrayMon.map(el => {
        if (el.type === "ingreso") {
            Mon += el.total
        } else {
            Mon -= el.total
        }
    })
    Acc2 = (Acc1 + Mon)

    arrayTue && arrayTue.map(el => {
        if (el.type === "ingreso") {
            Tue += el.total
        } else {
            Tue -= el.total
        }
    })
    Acc3 = (Acc2 + Tue)

    arrayWed && arrayWed.map(el => {
        if (el.type === "ingreso") {
            Wed += el.total
        } else {
            Wed -= el.total
        }
    })
    Acc4 = (Acc3 + Wed)

    arrayThu && arrayThu.map(el => {
        if (el.type === "ingreso") {
            Thu += el.total
        } else {
            Thu -= el.total
        }
    })
    Acc5 = (Acc4 + Thu)

    arrayFri && arrayFri.map(el => {
        if (el.type === "ingreso") {
            Fri += el.total
        } else {
            Fri -= el.total
        }
    })
    Acc6 = (Acc5 + Fri)

    arraySat && arraySat.map(el => {
        if (el.type === "ingreso") {
            Sat += el.total
        } else {
            Sat -= el.total
        }
    })
    Acc7 = (Acc6 + Sat)

    return [Acc1, Acc2, Acc3, Acc4, Acc5, Acc6, Acc7]
}
export const filtroMes = (todo, dayMonth, month, currentYear) => {

    let newArrayTodo = todo && todo.transactions
    let sumSemanaUno = 0;
    let sumSemanaDos = 0;
    let sumSemanaTres = 0;
    let sumSemanaCuatro = 0;
    let accumuladorSemanaUno = 0;
    let accumuladorSemanaDos = 0;
    let accumuladorSemanaTres = 0;
    let accumuladorSemanaCuatro = 0;

    let arrayAcumuladoUltimasDosSemanas = newArrayTodo && newArrayTodo.filter(el => el.createdAt[1] == (month + 1) && el.createdAt[2] <= dayMonth && el.createdAt[0] == currentYear)
   
    if(month >= 0){
        --month
    }
    if(month < 0){
        --currentYear
        month = 11
    } 
    let arrayAcumuladoPrimerasDosSemanas = newArrayTodo && newArrayTodo.filter(el => el.createdAt[1] == (month + 1) && el.createdAt[2] >= dayMonth && el.createdAt[0] == currentYear)

    let arraySemanaUno = arrayAcumuladoPrimerasDosSemanas && arrayAcumuladoPrimerasDosSemanas.splice(0, arrayAcumuladoPrimerasDosSemanas.length / 2)

    let arraySemanaDos = arrayAcumuladoPrimerasDosSemanas && arrayAcumuladoPrimerasDosSemanas.splice(0, arrayAcumuladoPrimerasDosSemanas.length)

    let arraySemanaTres = arrayAcumuladoUltimasDosSemanas && arrayAcumuladoUltimasDosSemanas.splice(0, arrayAcumuladoUltimasDosSemanas.length / 2)

    let arraySemanaCuatro = arrayAcumuladoUltimasDosSemanas && arrayAcumuladoUltimasDosSemanas.splice(0, arrayAcumuladoUltimasDosSemanas.length)

    arraySemanaUno && arraySemanaUno.map(el => {
        if(el.type === "ingreso"){
            sumSemanaUno += el.total
        } else{
            sumSemanaUno -= el.total
        }
    })
    accumuladorSemanaUno = sumSemanaUno;

    arraySemanaDos && arraySemanaDos.map(el => {
        if(el.type === "ingreso"){
            sumSemanaDos += el.total
        }else {
            sumSemanaDos -= el.total
        }
    })
    accumuladorSemanaDos = (accumuladorSemanaUno + sumSemanaDos);
    
    arraySemanaTres && arraySemanaTres.map(el => {
        if(el.type === "ingreso"){
            sumSemanaTres += el.total
        }else {
            sumSemanaTres -= el.total
        }
    })
    accumuladorSemanaTres = (accumuladorSemanaDos + sumSemanaTres);

    arraySemanaCuatro && arraySemanaCuatro.map(el => {
        if(el.type === "ingreso"){
            sumSemanaCuatro += el.total
        }else{
            sumSemanaCuatro -= el.total
        }
    })
    accumuladorSemanaCuatro = (accumuladorSemanaTres + sumSemanaCuatro)

    return [ accumuladorSemanaUno, accumuladorSemanaDos, accumuladorSemanaTres, accumuladorSemanaCuatro]
}

export const filtroSeisMeses = (todo, dayMonth, month, currentYear, status) =>{

    let newArray = todo && todo.transactions
    let sumPrimerMes = 0;
    let sumSegundoMes = 0;
    let sumTercerMes = 0;
    let sumCuartoMes = 0;
    let sumQuintoMes = 0;
    let sumSextoMes = 0;

    let acumuladorPrimesMes = 0;
    let acumuladorSegundoMes = 0;
    let acumuladorTercerMes = 0;
    let acumuladorCuartoMes = 0;
    let acumuladorQuintoMes = 0;
    let acumuladorSextoMes = 0;

    if (status) {
        for (let i = 0; i < 5; i++) {
            if (month >= 0) {
                --month
            }
            if (month < 0) {
                --currentYear
                month = 11
            }
        }
    }
    let arraySextoMes = newArray && newArray.filter(el => 
        el.createdAt[0] == currentYear && el.createdAt[1] == (month + 1) && el.createdAt[2] <= dayMonth)
    if (month >= 0) {
        --month
    }
    if (month < 0) {
        --currentYear
        month = 11
    }
    let arrayQuintoMes = newArray && newArray.filter(el =>
        el.createdAt[0] == currentYear && el.createdAt[1] == (month + 1))
    if (month >= 0) {
        --month
    }
    if (month < 0) {
        --currentYear
        month = 11
    }
    let arrayCuartoMes = newArray && newArray.filter(el =>
        el.createdAt[0] == currentYear && el.createdAt[1] == (month + 1))
    if (month >= 0) {
        --month
    }
    if (month < 0) {
        --currentYear
        month = 11
    }
    let arrayTercerMes = newArray && newArray.filter(el =>
        el.createdAt[0] == currentYear && el.createdAt[1] == (month + 1))
    if (month >= 0) {
        --month
    }
    if (month < 0) {
        --currentYear
        month = 11
    }
    let arraySegundoMes = newArray && newArray.filter(el =>
        el.createdAt[0] == currentYear && el.createdAt[1] == (month + 1))
    if (month >= 0) {
        --month
    }
    if (month < 0) {
        --currentYear
        month = 11
    }
    let arrayPrimerMes = newArray && newArray.filter(el => 
        el.createdAt[0] == currentYear && el.createdAt[1] == (month + 1) && el.createdAt[2] >= dayMonth)
    
    arrayPrimerMes && arrayPrimerMes.map(el => {
        if(el.type === "ingreso"){
            sumPrimerMes += el.total
        }else {
            sumPrimerMes -= el.total
        }
    })
    acumuladorPrimesMes = sumPrimerMes

    arraySegundoMes && arraySegundoMes.map(el => {
        if(el.type === "ingreso"){
            sumSegundoMes += el.total
        }else {
            sumSegundoMes -= el.total
        }
    })
    acumuladorSegundoMes = (acumuladorPrimesMes + sumSegundoMes)

    arrayTercerMes && arrayTercerMes.map(el =>{
        if(el.type === "ingreso"){
            sumTercerMes += el.total
        }else {
            sumTercerMes -= el.total
        }
    })
    acumuladorTercerMes = (acumuladorSegundoMes + sumTercerMes)

    arrayCuartoMes && arrayCuartoMes.map(el => {
        if(el.type === "ingreso"){
            sumCuartoMes += el.total
        }else {
            sumCuartoMes -= el.total
        }
    })
    acumuladorCuartoMes = (acumuladorTercerMes + sumCuartoMes)

    arrayQuintoMes && arrayQuintoMes.map(el => {
        if(el.type === "ingreso"){
            sumQuintoMes += el.total
        }else {
            sumQuintoMes -= el.total
        }
    })
    acumuladorQuintoMes = (acumuladorCuartoMes + sumQuintoMes)

    arraySextoMes && arraySextoMes.map(el => {
        if(el.type === "ingreso"){
            sumSextoMes += el.total
        }else {
            sumSextoMes -= el.total
        }
    })
    acumuladorSextoMes = (acumuladorQuintoMes + sumSextoMes)

    return [ acumuladorPrimesMes, acumuladorSegundoMes, acumuladorTercerMes, acumuladorCuartoMes, acumuladorQuintoMes, acumuladorSextoMes]
}

export const filtroUnAño = (todo, dayMonth, month, currentYear) => {

    let resultadoPrimerosSeisMeses = filtroSeisMeses(todo, dayMonth, month, currentYear, true)
    let resultadoUltimosSeisMeses = filtroSeisMeses(todo, dayMonth, month, currentYear)
    
    return [].concat(resultadoPrimerosSeisMeses, resultadoUltimosSeisMeses)
}