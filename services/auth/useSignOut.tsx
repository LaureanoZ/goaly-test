import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';  // Para redirigir después del sign out

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signOut = async () => {
    setIsLoading(true);
    try {
      await auth().signOut();
      // Redirigir a la pantalla de login después del cierre de sesión
      router.replace('/login'); 
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return { signOut, isLoading };
};