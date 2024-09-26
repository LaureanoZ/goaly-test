import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

 interface Props {
  onPress?: () => void,
  title: string,
  bgcolor?: string
 }


const StyledButton = ({ onPress, title, bgcolor= '#6200EE' }: Props) => {
  return (
    <Pressable style={{...styles.button, backgroundColor: bgcolor}} onPress={onPress}>
      <ThemedText style={styles.buttonText}>{title}</ThemedText>
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