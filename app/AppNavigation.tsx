import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

// Screens
import HistoryScreen from '../screens/HistoryScreen';
import LearnScreen from '../screens/LearnScreen';
import SettingsScreen from '../screens/SettingsScreen';
// Stacks
import CalculatorStack from './CalculatorStack';

export type RootStackParamList = {
  Calculator: undefined;
  History: undefined;
  Learn: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#09090b', // zinc-950
  },
};

function AppNavigation() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: 'transparent' },
          tabBarStyle: {
            backgroundColor: '#09090b',
            borderTopColor: '#18181b',
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: '#33C4E3',
          tabBarInactiveTintColor: '#71717a',
        }}
      >
        <Tab.Screen
          name="Calculator"
          component={CalculatorStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="activity" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="clock" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Learn"
          component={LearnScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="book-open" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
