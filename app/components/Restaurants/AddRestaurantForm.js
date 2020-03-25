import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native'
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import Modal from '../Modal'

const widthScreen = Dimensions.get("window").width

const AddRestaurantForm = props => {
  const [restaurantName, setRestaurantName] = useState("")
  const [restaurantAddress, setRestaurantAddress] = useState("")
  const [restaurantDescription, setRestaurantDescription] = useState("")
  const { toastRef, navigation, setIsloading } = props
  const [imagesSelected, setImagesSelected] = useState([])
  const [isVisibleMap, setIsVisibleMap] = useState(false)
  const [locationRestaurant, setLocationRestaurant] = useState(null)

  return (
    <ScrollView>
      <ImageRestaurant 
        imageRestaurant={imagesSelected[0]} />
      <FormAdd 
        setRestaurantName={setRestaurantName}
        setRestaurantAddress={setRestaurantAddress}
        setRestaurantDescription={setRestaurantDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationRestaurant={locationRestaurant}
      />
      <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
      <Map 
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationRestaurant={setLocationRestaurant}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

const ImageRestaurant = props => {
  const {imageRestaurant} = props
  return (
    <View style={styles.viewPhoto}>
      {imageRestaurant ? (
        <Image
          source={{ uri: imageRestaurant }}
          style={{ width: widthScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/no-image.png")}
          style={{ width: widthScreen, height: 200 }}
        />
      )}
    </View>
  );
}

const UploadImage = props => {
  const {imagesSelected, setImagesSelected, toastRef} = props 

  const removeImage = image => {
    const arrayImages = imagesSelected
    Alert.alert(
      "Eliminar Imágen", 
      "¿Estás seguro que quieres eliminar la imágen?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: ()=> setImagesSelected(arrayImages.filter(
            imageUrl => imageUrl !== image
          ))
        }
    ], {
      cancelable: false,
    })
  }

  const imageSelect = async () =>{
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    const resultPermissionCamera = resultPermission.permissions.cameraRoll.status
    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galería.", 5000)
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4,3]
      })

      if (result.cancelled) {
        toastRef.current.show("has cerrado la galería sin seleccionar ninguna imágen", 2000)
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
    
  }

  return (
    <View style={styles.viewImage}>
      {imagesSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {imagesSelected.map((imageRestaurant, index) => (
        <Avatar
          key={index}
          onPress={()=>removeImage(imageRestaurant)}
          style={styles.miniatureStyle}
          source={{ uri: imageRestaurant }}
        />
      ))}
    </View>
  );
}

const FormAdd = props => {
  const {
        setRestaurantName, 
        setRestaurantAddress, 
        setRestaurantDescription,
        setIsVisibleMap,
        locationRestaurant
      } = props

  return <View style={styles.viewForm}>
        <Input
          placeholder="Nombre del Restaurante"
          containerStyle={styles.input}
          onChange={e => setRestaurantName(e.nativeEvent.text)}
        />
        <Input 
          placeholder="Dirección"
          containerStyle={styles.input}
          rightIcon={{
            type:"material-community",
            name:"google-maps",
            color: locationRestaurant ? "#00a680" : "#c2c2c2",
            onPress: ()=> setIsVisibleMap(true)
          }}
          onChange={e => setRestaurantAddress(e.nativeEvent.text)}
        />
        <Input 
          placeholder="Descripción del Restaurante"
          multiline
          inputContainerStyle={styles.textArea}
          onChange={e=>setRestaurantDescription(e.nativeEvent.text)}
        />
      </View>
}

const Map = props => {
  const {isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef} = props
  const [location, setLocation] = useState(null)

  useEffect(()=>{
    (async ()=>{
      let resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
      const statusPermissions = resultPermissions.permissions.location.status
      if (statusPermissions !== "granted") {
        toastRef.current.show("Tienes que aceptar los permisos de localización", 4000)
      } else {
        const location = await Location.getCurrentPositionAsync({})
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        })
      }
    })()
  }, [])

  return <Modal
    isVisible={isVisibleMap}
    setIsVisible={setIsVisibleMap}
  >
    <View>
      {location && (
        <MapView 
          style={styles.mapStyle}
          initialRegion={location}
          showsUserLocation
          onRegionChange={region => setLocation(region)}
        >
          <MapView.Marker 
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            draggable
          />
        </MapView>) }
    </View>
    <View style={styles.viewMapBtn}>
      <Button
        title="Guardar ubicación"
        onPress={()=> console.log("ubicación guardada")}
        containerStyle={styles.viewMapBtnContainerSave}
        buttonStyle={styles.viewMapBtnSave}
      />
      <Button
        title="Cancelar ubicación"
        onPress={()=> setIsVisibleMap(false)}
        containerStyle={styles.viewMapBtnContainerCancel}
        buttonStyle={styles.viewMapBtnCancel}
      />
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  },
  mapStyle: {
    width: "100%",
    height: 400
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  viewMapBtnContainerSave: {
    paddingRight: 5
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680"
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d"
  }
});

export default AddRestaurantForm