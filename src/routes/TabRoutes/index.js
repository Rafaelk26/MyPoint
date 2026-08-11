import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

// Pages
import Home from '../../pages/Home';
import Historic from '../../pages/Historic';
import DayDetails from '../../pages/DayDetails';
import Profile from '../../pages/Profile';
import Docs from '../../pages/Docs';

const Tab = createBottomTabNavigator();

export function TabRoutes() {

    useFonts({
        Poppins_400Regular,
    });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="Ponto"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="access-alarm" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Histórico"
        component={Historic}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="clock" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Documentos"
        component={Docs}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}