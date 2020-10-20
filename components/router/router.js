import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../login/Login';

const screens = {
  Home: {
    screen: Login,
  },
};
const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
