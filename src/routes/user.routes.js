import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pages
import DayDetails from '../pages/DayDetails';

// Component Routes
import { TabRoutes } from './TabRoutes';


const Stack = createNativeStackNavigator();

export default function UserRoutes() {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
            name="Tabs" 
            component={TabRoutes}
            />

            <Stack.Screen 
            name="DayDetails" 
            component={DayDetails}
            />
        </Stack.Navigator>
    )
}