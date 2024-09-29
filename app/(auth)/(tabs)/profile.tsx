import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useUser } from '@/context/userContext';
import {ThemedText} from '@/components/ThemedText';
import StyledButton from '@/components/StyledButton';

const Profile = () => {
  const user = useUser();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }} // Cambié src a source
        style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 30, borderRadius: 50, borderColor: '#ffffff', borderWidth: 2 }}
      />
      <ThemedText>{user?.email}</ThemedText>
      <ThemedText>{user?.displayName ? user.displayName : 'Elije un nombre'}</ThemedText>
      <StyledButton
        bgcolor='red'
        title='Cerrar Sesión'
        onPress={() => {
          auth().signOut();
        }}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});