import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import { UserProvider } from '@/context/userContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('onAuthStateChanged llamado con usuario:', user);
    setUser(user);


  };
  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(auth)'

    if (user && !inAuthGroup) {
      router.replace('/(auth)/home')
    } else if (!user && inAuthGroup) {
      router.replace('/');
    }

  }, [user, initializing]);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    if (initializing) {
      setInitializing(false);
    }
    return subscriber;
  }, []);


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }



  if (initializing) {
    console.log("Mostrando pantalla de carga porque initializing es:", initializing);
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (

      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>

  );
}
