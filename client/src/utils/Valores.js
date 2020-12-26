import { useSelector } from "react-redux";

const date = new Date();
const dayMonth = date.getDate()
const day = date.getDay()

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

    let array7Dias = newArray && newArray.filter(pasa =>
        pasa.createdAt[2] >= dayMonth - 6)

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
        Acc1 = Sun
    }
    if (arrayMon !== undefined) {
        arrayMon.map(el => {
            if (el.type === "ingreso") {
                Mon += el.total
            } else {
                Mon -= el.total
            }
        })
        Acc2 = (Acc1 + Mon)
    }
    if (arrayTue !== undefined) {
        arrayTue.map(el => {
            if (el.type === "ingreso") {
                Tue += el.total
            } else {
                Tue -= el.total
            }
        })
        Acc3 = (Acc2 + Tue)
    }
    if (arrayWed !== undefined) {
        arrayWed.map(el => {
            if (el.type === "ingreso") {
                Wed += el.total
            } else {
                Wed -= el.total
            }
        })
        Acc3 = (Acc3 + Wed)
    }
    if (arrayThu !== undefined) {
        arrayThu.map(el => {
            if (el.type === "ingreso") {
                Thu += el.total
            } else {
                Thu -= el.total
            }
        })
        Acc5 = (Acc4 + Thu)
    }
    if (arrayFri !== undefined) {
        arrayFri.map(el => {
            if (el.type === "ingreso") {
                Fri += el.total
            } else {
                Fri -= el.total
            }
        })
        Acc6 = (Acc5 + Fri)
    }
    if (arraySat !== undefined) {
        arraySat.map(el => {
            if (el.type === "ingreso") {
                Sat += el.total
            } else {
                Sat -= el.total
            }
        })
        Acc7 = (Acc6 + Sat)
    }
    return [Acc1, Acc2, Acc3, Acc4, Acc5, Acc6, Acc7]
}