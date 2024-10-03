import React, { useState } from 'react';
import { StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { FirebaseError } from '@firebase/app';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import StyledButton from '@/components/StyledButton';
import ThemedTextInput from '@/components/ThemedTextInput';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import GoogleSignInButton from '@/components/GoogleSignInButton';

const Register = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async () => {
    setIsLoading(true);

    try {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!email) {
        Alert.alert('Campo obligatorio', 'Tienes que escribir tu email');
      } else if (!emailRegex.test(email)) {
        Alert.alert('Email inválido', 'Debes ingresar un correo electrónico válido');
      } else if (!password) {
        Alert.alert('Campo obligatorio', 'Tienes que escribir tu contraseña');
      } else if (!confirmPassword) {
        Alert.alert('Campo obligatorio', 'Tienes que confirmar tu contraseña');
      } else if (password !== confirmPassword) {
        Alert.alert('Error de coincidencia', 'Las contraseñas no coinciden. Intenta nuevamente.');
      } else {
        // Crear usuario
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        
        // Enviar correo de verificación
        await user.sendEmailVerification();

        // Desloguear al usuario inmediatamente
        await auth().signOut();

        // Informar al usuario que debe verificar su correo
        Alert.alert(
          'Verificación requerida',
          'Te hemos enviado un correo electrónico de verificación. Por favor, verifica tu cuenta antes de iniciar sesión.'
        );

        return true;
      }
    } catch (e: any) {
      const err = e as FirebaseError;
      Alert.alert('Error de registro', 'Registration failed: ' + err.message);
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
          onChangeText={setEmail}
          value={email}
        />
        <ThemedTextInput
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <ThemedTextInput
          placeholder="Confirma tu contraseña"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <StyledButton onPress={signUp} title="Crear cuenta" bgcolor="#0a7ea4" isLoading={isLoading} />
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
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" style={styles.link}>
            Inicia sesión
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
    color: '#008d00',
    fontWeight: 'bold',
  },
});

export default Register;