import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Warning: componentWillMount is deprecated",
  "Warning: componentWillUpdate is deprecated",
  "Warning: componentWillReceiveProps is deprecated",
]);

AppRegistry.registerComponent('tenedores5', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('tenedores5', { rootTag });
}
