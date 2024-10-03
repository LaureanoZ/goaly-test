import React, { useState } from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import ThemedTextInput from '@/components/ThemedTextInput';
import StyledButton from '@/components/StyledButton';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useSignIn } from '@/services/auth/useSignIn';

const Login = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useSignIn();

  const handleLogin = () => {
    signIn({email, password});
  }

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
        <StyledButton bgcolor="#008d00" onPress={handleLogin} title="Iniciar Sesión" isLoading={isLoading} />
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