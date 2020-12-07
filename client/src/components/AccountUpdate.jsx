import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

//Necesitas hacer npm install @react-native-community/checkbox --save

const AccountUpdate = () => {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(true);
  return (
    <View>
      <Text>Formulario de Carga de Datos</Text>
      <View>
        <Text>Nombre</Text>
        <TextInput
          name="firstName"
          placeholder="Introduzca su Nombre"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Text>Apellido</Text>
        <TextInput
          name="lastName"
          placeholder="Introduzca su Apellido"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Text>Tipo de Documento</Text>
        <View>
          <CheckBox checked={checked} onPress={setChecked(!checked)}>
            DNI
          </CheckBox>
          <CheckBox checked={!checked} onPress={setChecked(!checked)}>
            Pasaporte
          </CheckBox>
        </View>
        <Text>Numero de Documento</Text>
        {checked ? (
          <TextInput
            name="DNI"
            placeholder="Introduzca su Numero de Documento"
            onChangeText={(text) => setText(text)}
            defaultValue={text}
          />
        ) : (
          <TextInput
            name="Passport"
            placeholder="Introduzca su Numero de Documento"
            onChangeText={(text) => setText(text)}
            defaultValue={text}
          />
        )}

        <Text>Fecha de Nacimiento</Text>
        <TextInput
          name="birthDate"
          placeholder="DD/MM/AAAA"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Text>Telefono Celular</Text>
        <TextInput
          name="phone"
          placeholder="Introduzca su Numero Telefonico"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Text>Domicilio</Text>
        <Text>Calle</Text>
        <TextInput
          name="adress"
          placeholder="Introduzca su Calle"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Text>Numero</Text>
        <TextInput
          name="adressNumber"
          placeholder="Introduzca el Numero"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Text>Localidad</Text>
        <TextInput
          placeholder="Introduzca la Localidad"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Text>Provincia</Text>
        <TextInput
          placeholder="Introduzca la Provincia"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Button title="Hecho" onPress={} />
      </View>
    </View>
  );
};
