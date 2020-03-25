import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import { Input, Button } from "react-native-elements";
import * as firebase from 'firebase'

const ChangeDisplayNameForm = props =>{
  const { displayName, setIsVisibleModal, setReloadData, toastRef } = props
  const [newDisplayName, setNewDisplayName] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const updateDisplayName = () =>{
    setError(null);
    if(!newDisplayName){
      setError("El nombre de usuario no ha cambiado")
    } else {
      setIsLoading(true)
      const update = {
        displayName: newDisplayName
      }
      firebase.auth().currentUser.updateProfile(update).then(()=>{
        setIsLoading(false);
        setReloadData(true);
        toastRef.current.show("Nombre actualizado correctamente")
        setIsVisibleModal(false)
      }).catch(()=>{
        setError("Error al actualizar el nombre.")
        setIsLoading(false)
      })
    }
  }

  return (
    <View style={styles.view}>
      <Input 
        autoFocus
        placeholder="Nombre"
        containerStyle={styles.input}
        defaultValue={displayName && displayName}
        onChange={e=> setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2"
        }}
        errorMessage={error}
      />
      <Button 
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayName}
        loading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor:"#00a680"
  }
})

export default ChangeDisplayNameForm