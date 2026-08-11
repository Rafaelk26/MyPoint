import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pages
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ConfirmNewPassword from '../pages/ConfirmNewPassword';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ConfirmNewPassword" component={ConfirmNewPassword} />
    </Stack.Navigator>
  );
}