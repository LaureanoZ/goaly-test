import React, { useState } from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, Alert, Image } from 'react-native';
import { Link } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { FirebaseError } from '@firebase/app';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import ThemedTextInput from '@/components/ThemedTextInput';
import StyledButton from '@/components/StyledButton';
import GoogleSignInButton from '@/components/GoogleSignInButton';

const Login = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    setIsLoading(true);

    try {
      if (!email && !password) {
        Alert.alert('Campos obligatorios', 'Por favor, ingresa tu correo electrónico y contraseña para continuar.');
      } else if (!email) {
        Alert.alert('Campo obligatorio', 'Por favor, ingresa tu correo electrónico para continuar.');
      } else if (!password) {
        Alert.alert('Campo obligatorio', 'Por favor, ingresa tu contraseña para continuar.');
      } else {
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
      }
    } catch (e: any) {
      const err = e as FirebaseError;

      if (err.code === 'auth/wrong-password') {
        Alert.alert('Error de autenticación', 'La contraseña es incorrecta. Por favor, intenta de nuevo.');
      } else if (err.code === 'auth/user-not-found') {
        Alert.alert('Error de autenticación', 'No se encontró una cuenta con ese correo electrónico. Verifica tu correo o regístrate.');
      } else if (err.code === 'auth/invalid-email') {
        Alert.alert('Correo electrónico inválido', 'El formato del correo electrónico no es correcto. Verifica e intenta nuevamente.');
      } else {
        Alert.alert('Error de autenticación', 'Ocurrió un problema al iniciar sesión. Por favor, intenta más tarde.');
      }
    }
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <Image
          source={require('../assets/images/goaly-stroke.png')}
          style={{ width: 200, height: 70, alignSelf: 'center', marginBottom: 30 }}
          accessibilityLabel= 'Goaly logo'
        />
        <ThemedTextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <ThemedTextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <StyledButton bgcolor="#008d00" onPress={signIn} title="Iniciar Sesión" isLoading={isLoading} />
        <ThemedView
          style={{
            borderWidth: 0.5,
            borderColor: '#a3a3a3',
            marginVertical: 30,
            marginHorizontal: 40,
          }}
        />
        <GoogleSignInButton />
        <ThemedText style={[styles.footerText, { color: textColor }]}>
          ¿No tienes cuenta todavía?{' '}
          <Link href="/register" style={styles.link}>
            ¡Crea una!
          </Link>
        </ThemedText>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  footerText: {
    marginTop: 16,
    textAlign: 'center',
  },
  link: {
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
});

export default Login;