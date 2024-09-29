import { createContext, useContext, useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

// Crea el contexto del usuario
const UserContext = createContext<FirebaseAuthTypes.User | null>(null);

// Hook para usar el contexto
export const useUser = () => useContext(UserContext);

// Proveedor del contexto que envuelve la app
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Escucha el estado de autenticación de Firebase
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) {
    return (
      <ThemedView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  // Proporciona el usuario a toda la app
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};