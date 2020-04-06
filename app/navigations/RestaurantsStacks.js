import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from '../screens/Restaurants'
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurant'
import RestaurantScreen from '../screens/Restaurants/Restaurant'

const RestaurantsScreenStacks = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: () => ({
      title: "Restaurantes",
    }),
  },
  AddRestaurant: {
    screen: AddRestaurantScreen,
    navigationOptions: () => ({
      title: "Nuevo Restaurante",
    }),
  },
  Restaurant: {
    screen: RestaurantScreen,
    navigationOptions: (props) => ({
      title: props.navigation.state.params.restaurant.item.restaurant.name
    }),
  },
});

export default RestaurantsScreenStacks