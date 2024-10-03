import React, { useState } from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import StyledButton from '@/components/StyledButton';
import ThemedTextInput from '@/components/ThemedTextInput';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useSignUp } from '@/services/auth/useSignup';

const Register = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, isLoading } = useSignUp();

  const handleSignUp = () => {
    signUp({email, password, confirmPassword});
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
        <StyledButton onPress={handleSignUp} title="Crear cuenta" bgcolor="#0a7ea4" isLoading={isLoading} />
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