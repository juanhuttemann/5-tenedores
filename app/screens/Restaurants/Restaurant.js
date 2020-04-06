import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Dimensions } from "react-native";
import { Rating, ListItem } from "react-native-elements";
import Map from "../../components/Map";
import CarouselImages from "../../components/Carousel";
import * as firebase from "firebase";

const screenWidth = Dimensions.get("window").width;
import ListReviews from "../../components/Restaurants/ListReviews";

const Restaurant = (props) => {
  const { navigation } = props;
  const { restaurant } = navigation.state.params.restaurant.item;
  const [imagesRestaurant, setImagesRestaurant] = useState([]);

  useEffect(() => {
    const arrayUrls = [];

    (async () => {
      await Promise.all(
        restaurant.images.map(async (idImage) => {
          await firebase
            .storage()
            .ref(`restaurant-images/${idImage}`)
            .getDownloadURL()
            .then((imageUrl) => {
              arrayUrls.push(imageUrl);
            });
        })
      );
      setImagesRestaurant(arrayUrls);
    })();
  }, []);

  return (
    <ScrollView style={styles.viewBody}>
      <CarouselImages
        arrayImages={imagesRestaurant}
        width={screenWidth}
        height={200}
      />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        rating={restaurant.rating}
      />
      <RestaurantInfo
        location={restaurant.location}
        name={restaurant.name}
        address={restaurant.address}
      />
      <ListReviews 
        navigation={navigation}
        idRestaurant={restaurant.id}
      />
    </ScrollView>
  );
};

const TitleRestaurant = (props) => {
  const { name, description, rating } = props;
  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
};

const RestaurantInfo = (props) => {
  const { location, name, address } = props;

  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null
    }
  ]

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.restaurantInfoTitle}>
        Información sobre el Restaurante
      </Text>
      <Map location={location} name={name} height={100} />
      {listInfo.map((item, index)=>(
        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#00a680"
          }}
          containerStyle={styles.containerListItem}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewRestaurantTitle: {
    margin: 15,
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey",
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25,
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1
  }
});

export default Restaurant;
