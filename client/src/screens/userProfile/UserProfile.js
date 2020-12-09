import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Avatar } from '@material-ui/core'
import styled from 'styled-components';

export default function UserProfile(props){

    return (

        <SafeAreaView>
            <View style={s.container}>
                <View style={s.containerMain}>
                    <View style={s.container_img}>
                        <Avatar style={{ width: 200, height: 200, borderRadius: "50%" }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGT5W0D9qW_SkbX2W1OR7vC_ttDmX0mNnBPg&usqp=CAU'/>
                        <Text style={s.textUser}>Maico Loncomilla</Text>
                        <Text style={s.textEmail}>maicoloncomilla@gmail.com</Text>
                    </View>
                    <View style={s.container_buttons}>
                        <ButtonLink>
                            Mi Código QR
                                <NavigateNextIcon />
                        </ButtonLink>
                        <ButtonLink>
                            Mi CVU
                                <NavigateNextIcon />
                        </ButtonLink>
                        <ButtonLink onClick={() => props.navigation.navigate("CreateUser")}>
                            Datos Personales
                                <NavigateNextIcon />
                        </ButtonLink>
                    </View>
                </View>
            </View>
        </SafeAreaView>
       
    )
}
const ButtonLink = styled.div`
    max-width: 320px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    color: #fff;
    margin: 5px 0px;
    border-radius: 5px;
    font-size: 14px;
`
const s = StyleSheet.create({
    container:{
        width: '100%',
        height: '100vh',
        backgroundColor: '#232323'
    },
    containerMain:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 10,
    },
    container_img: {
        textAlign: "center",
    },
    container_buttons:{
        flex: 1,
        width: '100%',
    },
    textUser: {
        fontSize: '18px',
        color: "#fff",
        marginTop: '8px'
    },
    textEmail:{
        color: "#fff",
        marginBottom: 20
    },
})