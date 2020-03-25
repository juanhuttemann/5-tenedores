import React, { useState } from "react";
import { StyleSheet, View} from 'react-native'
import { Input, Icon, Button} from 'react-native-elements'
import { validateEmail } from '../../utils/Validation'
import * as firebase from 'firebase'
import Loading from '../Loading'
import {  withNavigation } from 'react-navigation'


const RegisterForm = (props)=> {
  const {toastRef, navigation } = props
  const [isVisibleLoading, setIsVisibleLoading] = useState(false)
  const [ hidePassword, setHidePassword ] = useState(true);
  const [ hideRepeatPassword, setHideRepeatPassword] = useState(true);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const register = async () => {
    setIsVisibleLoading(true)
    if (!email || !password || !repeatPassword) {
      toastRef.current.show("Todos los campos son obligatorios")
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("Email no es correcto");
      } else {
        if (password !== repeatPassword) {
          toastRef.current.show("Las contraseña no coinciden");
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(()=> {
              navigation.navigate("MyAccount")
            }).catch(()=>{
              toastRef.current.show("Error al crear la cuenta, intentelo más tarde.");
            })
        }
      }
    }
    
    setIsVisibleLoading(false);

  }
  return (
    <View style={styles.formContainer} behavior="padding" enabled>
      <Input
        placeholder="Correo"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            name="at"
            type="material-community"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            type="material-community"
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />

      <Input
        placeholder="Repetir Contraseña"
        password={true}
        secureTextEntry={hideRepeatPassword}
        containerStyle={styles.inputForm}
        onChange={e => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            type="material-community"
            iconStyle={styles.iconRight}
            onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
      <Loading text={"Creando cuenta"} isVisible={isVisibleLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRight: {
    color: "#c1c1c1"
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680"
  }
});

export default withNavigation(RegisterForm); 