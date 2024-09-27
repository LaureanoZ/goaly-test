import React, { useState } from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Link } from 'expo-router';
import auth from '@react-native-firebase/auth'
import {FirebaseError} from '@firebase/app'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import ThemedTextInput from '@/components/ThemedTextInput';
import StyledButton from '@/components/StyledButton';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import ThemeIcon from '@/components/ThemeIcon';

const login = () => {

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {

    setIsLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Registration failed ' + err.message )
    }
    setIsLoading(false);

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <ThemedText style={[styles.title, { color: textColor }]}>Bienvenido</ThemedText>
        <ThemedTextInput
          placeholder="Email"
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
        <StyledButton onPress={signIn} title="Iniciar Sesión" />
        <ThemedView style={{
          borderWidth: 0.5,
          borderColor: '#a3a3a3',
          marginVertical: 30,
          marginHorizontal: 40
          }} />
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
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
});

export default login;