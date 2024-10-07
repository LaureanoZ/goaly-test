import { createContext, useContext, useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { router, useSegments } from 'expo-router';

// Crea el contexto del usuario
const UserContext = createContext<FirebaseAuthTypes.User | null>(null);

// Hook para usar el contexto
export const useUser = () => useContext(UserContext);

// Proveedor del contexto que envuelve la app
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const segments = useSegments();

  useEffect(() => {


    if (initializing) return;
    const inAuthGroup = segments[0] === '(auth)'
    
    if (user && !inAuthGroup) {
      router.replace('/(auth)/(tabs)/home')

    } else if (!user && inAuthGroup) {
      
      router.replace('/');

    }

  }, [user, initializing]);

  // Escucha el estado de autenticación de Firebase
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log(initializing, 'segundo')
      setUser(user);
      setInitializing(false);
      console.log(initializing, 'segundo')
    });
    return subscriber;
  }, []);

  if (initializing) {
    console.log(user)
    return (
      <ThemedView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  // Proporciona el usuario a toda la app
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};