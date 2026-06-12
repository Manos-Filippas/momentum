import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/public/LoginScreen';

export type PublicStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<PublicStackParamList>();

export default function PublicNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
