import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/authenticated/HomeScreen';
import FloatingTabBar from '../components/navigation/FloatingTabBar';

export type AuthenticatedTabParamList = {
  Home: undefined;
};

const Tab = createBottomTabNavigator<AuthenticatedTabParamList>();

export default function AuthenticatedNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}
