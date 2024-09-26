import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import StyledButton from '@/components/StyledButton'
import auth from '@react-native-firebase/auth';

const home = () => {
  return (
    <View style={styles.container}>
      <StyledButton bgcolor='red' title='Cerrar Session' onPress={()=>{auth().signOut()}}></StyledButton>
    </View>
  )
}

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  }
})