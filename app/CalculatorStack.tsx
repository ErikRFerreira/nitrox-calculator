import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalculatorScreen from '../screens/CalculatorScreen';
import LabelScreen from '../screens/LabelScreen';

export type CalculatorStackParamList = {
  CalculatorMain: undefined;
  Label: {
    o2: number;
    he: number;
    ppO2: number;
    modMeters?: number;
    endMeters?: number;
  };
};

const Stack = createNativeStackNavigator<CalculatorStackParamList>();

export default function CalculatorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CalculatorMain" component={CalculatorScreen} />
      <Stack.Screen name="Label" component={LabelScreen} />
    </Stack.Navigator>
  );
}
