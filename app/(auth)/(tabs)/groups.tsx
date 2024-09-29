import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import StyledButton from '@/components/StyledButton'
import auth from '@react-native-firebase/auth';
import { ThemedText } from '@/components/ThemedText';

const groups = () => {
  return (
    <View style={styles.container}>
      <ThemedText>groups</ThemedText>
    </View>
  )
}

export default groups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  }
})