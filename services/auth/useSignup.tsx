import { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { createUserDocument } from '../firestore/firestoreService'; // Importamos la función que crea el documento en Firestore

interface SignUpProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUp = async ({ email, password, confirmPassword }: SignUpProps) => {
    setIsLoading(true);

    try {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!email) {
        Alert.alert('Campo obligatorio', 'Tienes que escribir tu email');
        return;
      } else if (!emailRegex.test(email)) {
        Alert.alert('Email inválido', 'Debes ingresar un correo electrónico válido');
        return;
      } else if (!password) {
        Alert.alert('Campo obligatorio', 'Tienes que escribir tu contraseña');
        return;
      } else if (!confirmPassword) {
        Alert.alert('Campo obligatorio', 'Tienes que confirmar tu contraseña');
        return;
      } else if (password !== confirmPassword) {
        Alert.alert('Error de coincidencia', 'Las contraseñas no coinciden. Intenta nuevamente.');
        return;
      }

      // Crear usuario con email y contraseña en Firebase Authentication
      const { user } = await auth().createUserWithEmailAndPassword(email, password);

      // Enviar correo de verificación
      // await user.sendEmailVerification();

      // Crear documento en Firestore para el nuevo usuario
      await createUserDocument(user.uid, user.email || '', user.photoURL || '', user.displayName || '');

      // Desloguear al usuario inmediatamente después de la creación
      // await auth().signOut();

      // Informar al usuario que debe verificar su correo
      // Alert.alert(
      //   'Verificación requerida',
      //   'Te hemos enviado un correo electrónico de verificación. Por favor, verifica tu cuenta antes de iniciar sesión.'
      // );

      return true;

    } catch (e: any) {
      // Manejo de errores durante el registro
      Alert.alert('Error de registro', 'Ocurrió un error al registrarse: ' + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading };
};