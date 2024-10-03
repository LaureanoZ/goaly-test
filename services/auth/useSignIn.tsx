import { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth'

interface Props {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signIn = async ({ email, password }: Props) => {
    setIsLoading(true);

    try {
      // Validación de campos vacíos
      if (!email && !password) {
        Alert.alert(
          'Campos obligatorios',
          'Por favor, ingresa tu correo electrónico y contraseña para continuar.'
        );
        return;
      } else if (!email) {
        Alert.alert('Campo obligatorio', 'Por favor, ingresa tu correo electrónico para continuar.');
        return;
      } else if (!password) {
        Alert.alert('Campo obligatorio', 'Por favor, ingresa tu contraseña para continuar.');
        return;
      }

      // Iniciar sesión con email y contraseña
      const { user } = await auth().signInWithEmailAndPassword(email, password);

      // Verificar si el email ha sido verificado
      if (user.emailVerified) {
        Alert.alert('Inicio de sesión exitoso', 'Has iniciado sesión correctamente.');
        // Aquí puedes redirigir al usuario a la pantalla principal
      } else {
        Alert.alert(
          'Correo no verificado',
          'Debes verificar tu correo electrónico antes de poder iniciar sesión. Revisa tu bandeja de entrada y haz clic en el enlace de verificación.'
        );
        await auth().signOut(); // Cerrar sesión hasta que el usuario verifique el correo
      }
    } catch (e: any) {
      // Manejo de errores específicos
      if (e.code === 'auth/wrong-password') {
        Alert.alert('Error de autenticación', 'La contraseña es incorrecta. Por favor, intenta de nuevo.');
      } else if (e.code === 'auth/user-not-found') {
        Alert.alert(
          'Error de autenticación',
          'No se encontró una cuenta con ese correo electrónico. Verifica tu correo o regístrate.'
        );
      } else if (e.code === 'auth/invalid-email') {
        Alert.alert(
          'Correo electrónico inválido',
          'El formato del correo electrónico no es correcto. Verifica e intenta nuevamente.'
        );
      } else {
        Alert.alert('Error de autenticación', 'Ocurrió un problema al iniciar sesión. Por favor, intenta más tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading };
};