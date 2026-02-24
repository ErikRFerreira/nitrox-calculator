import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import CalculatorScreen from '../screens/CalculatorScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LearnScreen from '../screens/LearnScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  Calculator: undefined;
  History: undefined;
  Learn: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#09090b',
            borderTopColor: '#18181b',
          },
          tabBarActiveTintColor: '#2EC4B6',
          tabBarInactiveTintColor: '#71717a',
        }}
      >
        <Tab.Screen name="Calculator" component={CalculatorScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
