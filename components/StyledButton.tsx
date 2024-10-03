import React from 'react';
import { Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from './ThemedText';

interface Props {
  onPress?: () => void;
  title: string;
  bgcolor?: string;
  isLoading?: boolean;  // Añadimos la propiedad isLoading
}

const StyledButton = ({ onPress, title, bgcolor = '#6200EE', isLoading = false }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          ...styles.button,
          backgroundColor: bgcolor,
          opacity: pressed || isLoading ? 0.8 : 1,  // Si está presionado o cargando, reducimos la opacidad
        },
      ]}
      onPress={isLoading ? undefined : onPress}  // Desactivar el botón si está cargando
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />  // Mostrar ActivityIndicator si isLoading es true
      ) : (
        <ThemedText style={styles.buttonText}>{title}</ThemedText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StyledButton;