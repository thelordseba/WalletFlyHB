import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import firebaseConfig from "../../../../firebase/firebase-config.js";
import firebase from "firebase/app";
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from 'react-native-paper';
import emptyAvatar from '../../../../../assets/descarga.png';
//import { useSelector } from 'react-redux';

firebase.initializeApp(firebaseConfig);  //Establecemos la conexión con firebase

export default function UploadImage(props){
   // const user = useSelector(state => state.user);
    
    const [state, setState] = useState({
        userEmail: props.email,
        imageFirebase: ''
    });    

    useEffect(()=>{
        loadImage();        
    }, []);

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
                const { userEmail } = state;
    
                var ref = firebase.storage().ref().child(`/profileImage/${userEmail}`);    
                
                uploadImageFirebase(imageUri)
                .then(blob => {                    
                    ref.put(blob)    //Aqui agregamos efectivamente nuestro archivo (en formato blob) a firebase
                    .then(() =>{
                        //console.log('Imagen subida con éxito!!!');                        
                        loadImage();
                    });                
                })
                .catch(error=>{
                    console.log(error);
                });               
            }                         
        }  
    }

    const loadImage = async ()=>{
        const { userEmail } = state;
        firebase.storage().ref(`/profileImage/${userEmail}`).getDownloadURL()  
        .then(image =>{
            setState({   
                ... state,             
                imageFirebase: image
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    const showImage = ()=>{
        const {imageFirebase} = state;
        if(imageFirebase){
            return (
                <Avatar.Image
                    source={{ uri: imageFirebase }}
                    size= {100}                    
                />                
            )
        } else {          
            return (
                <Avatar.Image 
                  size={100}                   
                  source={emptyAvatar}
                />
            )            
        }        
    }

    return (
        <View style={styles.container}>
            {showImage()}

            <View>
                <MaterialCommunityIcons 
                style = {styles.buttons}
                onPress={() => getDeviceImage('gallery')}
                name="lead-pencil"  
                size= {20}                         
                />
            </View>

            <View>
                <MaterialCommunityIcons 
                style = {styles.buttons}
                onPress={() => getDeviceImage('camera')}
                name="camera-plus" 
                size= {20}                
                />
             </View>           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,     
      alignItems: "center",
      justifyContent: "center",
      width: '100%',
      backgroundColor: '#232323',
      height: '100%'
    },
    buttons:{
        color: '#FAFAFA'        
    }
  });