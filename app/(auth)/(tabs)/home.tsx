import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import StyledButton from '@/components/StyledButton'
import auth from '@react-native-firebase/auth';
import { ThemedText } from '@/components/ThemedText';

const home = () => {
  return (
    <View style={styles.container}>
      <ThemedText>Home</ThemedText>
    </View>
  )
}

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  }
})