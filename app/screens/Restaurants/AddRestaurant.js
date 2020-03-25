import React, {useState, useRef} from 'react';
import { View, Text } from 'react-native'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import AddRestaurantForm from '../../components/Restaurants/AddRestaurantForm'

const AddRestaurant = props => {
  const {navigation} = props
  const toastRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <View>
      <AddRestaurantForm 
        toastRef={toastRef}
        navigation={navigation} 
        setIsLoading={setIsLoading}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Creando restaurante" />
    </View>
  );
}

export default AddRestaurant