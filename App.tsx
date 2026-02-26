import { StatusBar } from 'expo-status-bar';

import AppBackground from './app/AppBackground';
import AppNavigation from './app/AppNavigation';

import './global.css';

export default function App() {
  return (
    <AppBackground>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <AppNavigation />
    </AppBackground>
  );
}
