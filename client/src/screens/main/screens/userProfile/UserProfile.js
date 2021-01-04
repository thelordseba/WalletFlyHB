import React, {useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Avatar, Appbar } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from "firebase/app";
import 'firebase/storage';
import emptyAvatar from '../../../../../assets/descarga.png';
import * as ImagePicker from 'expo-image-picker';
import api from '../../../../reducer/ActionCreator';


export default function UserProfile({ navigation }) {
    
    const user = useSelector(state => state.user)       
    const userImage = useSelector(state => state.userImage)
    const dispatch = useDispatch();
    const { USER_IMAGE } = api; 

    useEffect(()=>{
        loadImage();        
    }, [userImage]);

    const uploadImageFirebase = (uri) => {      
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {                
                if (xhr.readyState === 4) {  //La propiedad XMLHttpRequest.readyState devuelve el estado en el que se encuentra un cliente. El 4 indica que la operación esta completa.
                    resolve(xhr.response);  //response: Devuelve un objeto (en nuestro caso va a ser Blob) que contiene el cuerpo de la entidad respuesta.
                }
            };
            xhr.open("GET", uri);       //Inicializa una solicitud.
            xhr.responseType = "blob";  //El response es un objeto Blob que contiene los datos binarios.
            xhr.send();                 //Envía la solicitud. Si la solicitud es asincrónica (que es el valor predeterminado), este método regresa tan pronto como se envía la solicitud.
        });
    };

    const getDeviceImage = async (source)=>{               
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);  //Con esto pido permiso para poder acceder a los recursos del dispositivo         
        if(resultPermission){
            //Permiso aceptado                  
            let resultImagePicker;
            let imageSettings = {
                allowsEditing: true, 
                aspect: [4, 4],
                quality: 1,
                base64: true                
            }

            if(source === 'gallery'){
                resultImagePicker = await ImagePicker.launchImageLibraryAsync(imageSettings);  //launchImageLibraryAsync para seleccionar una imagen de la galería del dispositivo                  
            } else if(source === 'camera'){
                resultImagePicker = await ImagePicker.launchCameraAsync(imageSettings);   //launchCameraAsync para tomar fotografía con el dispositivo                 
            }

            if(resultImagePicker.cancelled === false){            
                const imageUri = resultImagePicker.uri;           

                var ref = firebase.storage().ref().child(`/profileImage/${user.email}`);                  
                
                uploadImageFirebase(imageUri)
                .then(blob => {                    
                    ref.put(blob)    //Aqui agregamos efectivamente nuestro archivo (en formato blob) a firebase
                    .then(() =>{                       
                        dispatch({
                            type: USER_IMAGE,
                            payload: imageUri
                        });                        
                    });                
                })
                .catch(error=>{
                   // console.log(error);
                });               
            }                         
        }  
    }

    const loadImage = async ()=>{  
        firebase.storage().ref(`/profileImage/${user.email}`).getDownloadURL()  
        .then(image =>{      
            dispatch({
                type: USER_IMAGE,
                payload: image
            });
        })
        .catch(error => {
            //console.log(error);
        });
    }  

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
                <Appbar.Content title="Perfil" />
            </Appbar.Header>

            <SafeAreaView>
                <View style={s.container}>
                    <View style={s.containerImg}>                                                                                    
                        <Avatar.Image 
                            source={{ uri: userImage ? userImage : emptyAvatar}} 
                            size= {100} 
                        /> 
                        <View>
                            <MaterialCommunityIcons                                
                            onPress={() => getDeviceImage('gallery')}
                            name="lead-pencil"  
                            size= {20}  
                            color= '#FAFAFA'                        
                            />
                        </View>
                        <View>
                            <MaterialCommunityIcons                               
                            onPress={() => getDeviceImage('camera')}
                            name="camera-plus" 
                            size= {20}                
                            color= '#FAFAFA'                        
                            />
                        </View>                                 

                        <Text style={s.textUser}>{user.firstName} {user.lastName}</Text>
                        <Text style={s.textEmail}>{user.email}</Text>
                    </View>
                    <Button mode="outlined" onPress={() => navigation.navigate("DatosPersonales")}>
                        Mi Código QR
                </Button>
                    <Button mode="outlined" onPress={() => navigation.navigate("DatosPersonales")}>
                        MI CVU
                </Button>
                    <Button mode="outlined" onPress={() => navigation.navigate("DatosPersonales")}>
                        Datos Personales
                </Button>
                </View>
            </SafeAreaView>
        </>
    )
}

const s = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#232323',
        height: '100%'
    },
    containerImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    textUser: {
        fontSize: 18,
        color: "#fff",
        marginTop: 8
    },
    textEmail: {
        color: "#fff",
        marginBottom: 20,
        fontSize: 14,
    },
})