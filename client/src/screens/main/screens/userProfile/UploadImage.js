import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import firebase from "firebase/app";
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from 'react-native-paper';
import emptyAvatar from '../../../../../assets/descarga.png';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../../../reducer/ActionCreator';


export default function UploadImage(){
    const user = useSelector(state => state.user);  
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

    const showImage = ()=>{    
        if(userImage){
            return (
                <Avatar.Image
                    source={{ uri: userImage }}
                    size= {100}                    
                />                
            )
        } else {          
            return (
                <Avatar.Image 
                  size={100}                   
                  source={{uri: emptyAvatar}}
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