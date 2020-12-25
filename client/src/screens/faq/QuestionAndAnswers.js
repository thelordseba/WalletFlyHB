import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Modelo, ModeloDrop } from './Modelo';
import data from './arrayAyuda';
import { ScrollView } from 'react-native-gesture-handler';

export default function QuestionAndAnswers({ navigation }){

    const user = useSelector(state => state.user)
    const [ text, setText ] = useState("");
    const [ active, setActive ] = useState(false);
    const handleTextChange = (name, status) => {
        status ? setText(name) : setText("");
        setActive(!status)
    }
    return (
        <ScrollView>
            {user &&
                <Appbar.Header>
                    <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Preguntas y Respuestas" />
                </Appbar.Header>
            }
            <TouchableOpacity onPress={() => handleTextChange("proyectoHenry", text !== "proyectoHenry" ? true : false)}>
                <Modelo 
                    title={data.proyectoHenry.title} 
                    icon={text === "proyectoHenry" ? true: false} />
            </TouchableOpacity>
            {
                text === "proyectoHenry" && !active &&
                <ModeloDrop text={data.proyectoHenry.text} />
            }

            <TouchableOpacity onPress={() => handleTextChange("huella", text !== "huella" ? true : false)}>
                <Modelo 
                    title={data.huella.title} 
                    icon={text === "huella" ? true: false} />
            </TouchableOpacity>
            {
                text === "huella" && !active &&
                <ModeloDrop text={data.huella.text} />
            }

            <TouchableOpacity onPress={() => handleTextChange("tarjeta", text !== "tarjeta" ? true : false)}>
                <Modelo
                    title={data.tarjeta.title}
                    icon={text === "tarjeta" ? true : false} />
            </TouchableOpacity>
            {
                text === "tarjeta" && !active &&
                <ModeloDrop text={data.tarjeta.text} />
            }

            <TouchableOpacity onPress={() => handleTextChange("editarDatos", text !== "editarDatos" ? true : false)}>
                <Modelo
                    title={data.editarDatos.title}
                    icon={text === "editarDatos" ? true : false} />
            </TouchableOpacity>
            {
                text === "editarDatos" && !active &&
                <ModeloDrop text={data.editarDatos.text} />
            }

            <TouchableOpacity onPress={() => handleTextChange("retirarCajero", text !== "retirarCajero" ? true : false)}>
                <Modelo
                    title={data.retirarCajero.title}
                    icon={text === "retirarCajero" ? true : false} />
            </TouchableOpacity>
            {
                text === "retirarCajero" && !active &&
                <ModeloDrop text={data.retirarCajero.text} />
            }
            
            <TouchableOpacity onPress={() => handleTextChange("transferirContacto", text !== "transferirContacto" ? true : false)}>
                <Modelo
                    title={data.transferirContacto.title}
                    icon={text === "transferirContacto" ? true : false} />
            </TouchableOpacity>
            {
                text === "transferirContacto" && !active &&
                <ModeloDrop text={data.transferirContacto.text} />
            }

            <TouchableOpacity onPress={() => handleTextChange("transferirDesconocido", text !== "transferirDesconocido" ? true : false)}>
                <Modelo
                    title={data.transferirDesconocido.title}
                    icon={text === "transferirDesconocido" ? true : false} />
            </TouchableOpacity>
            {
                text === "transferirDesconocido" && !active &&
                <ModeloDrop text={data.transferirDesconocido.text} />
            }

            <TouchableOpacity onPress={() => handleTextChange("pagos", text !== "pagos" ? true : false)}>
                <Modelo
                    title={data.pagos.title}
                    icon={text === "pagos" ? true : false} />
            </TouchableOpacity>
            {
                text === "pagos" && !active &&
                <ModeloDrop text={data.pagos.text} />
            }

            <TouchableOpacity onPress={() => handleTextChange("entretenimiento", text !== "entretenimiento" ? true : false)}>
                <Modelo
                    title={data.entretenimiento.title}
                    icon={text === "entretenimiento" ? true : false} />
            </TouchableOpacity>
            {
                text === "entretenimiento" && !active &&
                <ModeloDrop text={data.entretenimiento.text} />
            }

            <TouchableOpacity onPress={() => handleTextChange("recarga", text !== "recarga" ? true : false)}>
                <Modelo
                    title={data.recarga.title}
                    icon={text === "recarga" ? true : false} />
            </TouchableOpacity>
            {
                text === "recarga" && !active &&
                <ModeloDrop text={data.recarga.text} />
            }

            <TouchableOpacity onPress={() => handleTextChange("tarjetaWalletFly", text !== "tarjetaWalletFly" ? true : false)}>
                <Modelo
                    title={data.tarjetaWalletFly.title}
                    icon={text === "tarjetaWalletFly" ? true : false} />
            </TouchableOpacity>
            {
                text === "tarjetaWalletFly" && !active &&
                <ModeloDrop text={data.tarjetaWalletFly.text} />
            }
            
        </ScrollView>
    )
}