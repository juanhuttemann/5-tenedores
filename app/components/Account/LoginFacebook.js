import React, { useState } from 'react'
import { SocialIcon } from 'react-native-elements';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import Loading from '../Loading'

const LoginFacebook = (props) => {
  const { toastRef, navigation } = props
  const [isLoading, setIsLoading] = useState(false)
  

  const logIn = async () => {
    try {
      await Facebook.initializeAsync("770090710163574");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
      setIsLoading(true);
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          navigation.navigate("MyAccount");
        })
        .catch(({message}) => {
          toastRef.current.show(message);
        });
      } else {
        toastRef.current.show("Inicio de sesión cancelado");
      }
    } catch ({ message }) {
      toastRef.current.show(message);
    }
    setIsLoading(false)

  }

  return(
    <>
    <SocialIcon
      title="Iniciar sesión con Facebook"
      button
      type="facebook"
      onPress={logIn}
    />
    <Loading isVisible={isLoading} />
    </>
  )
}

export default LoginFacebook;