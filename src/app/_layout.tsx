import "../global.css";
import { Slot } from "expo-router";

import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";


SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // Load fonts
const [loaded, error] = useFonts({
  'Inter-Regular': Inter_400Regular,
  'Inter-SemiBold': Inter_600SemiBold,
  'Inter-Bold': Inter_700Bold,
});


   useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Slot />;
}
