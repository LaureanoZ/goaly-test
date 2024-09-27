import React, { useState } from 'react';
import { StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import auth from '@react-native-firebase/auth'
import {FirebaseError} from '@firebase/app'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import StyledButton from '@/components/StyledButton';
import ThemedTextInput from '@/components/ThemedTextInput';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import GoogleSignInButton from '@/components/GoogleSignInButton';

const register = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const singUp = async () => {
    setIsLoading(true);

    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Registration failed ' + err.message )
    }
    setIsLoading(false);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <ThemedText style={[styles.title, { color: textColor }]}>Crea tu cuenta</ThemedText>
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
        <StyledButton onPress={singUp} title="Crear cuenta" bgcolor='#0a7ea4' />
        <ThemedView style={{
          borderWidth: 0.5,
          borderColor: '#a3a3a3',
          marginVertical: 30,
          marginHorizontal: 40
          }} />
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
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  footerText: {
    marginTop: 16,
    textAlign: 'center',
  },
  link: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
});

export default register;