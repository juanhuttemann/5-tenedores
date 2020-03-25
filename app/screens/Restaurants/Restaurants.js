import React, {useState, useEffect} from 'react';
import { View, Text,StyleSheet } from 'react-native'
import ActionButton from 'react-native-action-button'
import * as firebase from 'firebase'

const Restaurants = props => {
  const {navigation} = props
  const [user, setUser] = useState(null)

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo)
    })
  }, [])

  return (
    <View style={styles.viewBody}>
      <Text>Restaurants</Text>
      {user && <AddRestaurantButton navigation={navigation} />}
    </View>
  );
}


const AddRestaurantButton = props => {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate("AddRestaurant")}
    />
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
})

export default Restaurants