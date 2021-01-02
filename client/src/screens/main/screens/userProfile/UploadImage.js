import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import firebaseConfig from "../../../../firebase/firebase-config.js";
import firebase from "firebase/app";
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
firebase.initializeApp(firebaseConfig);  //Establecemos la conexión con firebase

export default function UploadImage(){    
    const [state, setState] = useState({
        userEmail:"sebatruisi@gmail.com",
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
                quality: 1                
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

    const checkImage = ()=>{
        const {imageFirebase} = state;
        if(imageFirebase){
            return (
                <Image
                    style={{ width: 300, height: 300 }}
                    source={{ uri: imageFirebase }}                
                />
            )
        }
        return null;
    }

    return (
        <View style={styles.container}>
            {checkImage()}
            <Button
            onPress={() => getDeviceImage('gallery')}
            title="Selecionar imagen"
            color="#841584"
            />     
            <Button
            onPress={() => getDeviceImage('camera')}
            title="Cámara del dispositivo"
            color="#841584"
            />           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
  });