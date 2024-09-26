import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ThemedTextInputProps extends TextInputProps {
  lightColor?: string;
  darkColor?: string;
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({ style, lightColor, darkColor, ...props }) => {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
  const placeholderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  return (
    <TextInput
      style={[styles.input, { color: textColor, borderColor }, style]}
      placeholderTextColor={placeholderColor}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
});

export default ThemedTextInput;