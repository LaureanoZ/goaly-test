import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useUser } from '@/context/userContext';
import { ThemedText } from '@/components/ThemedText';
import StyledButton from '@/components/StyledButton';
import { getUserDocument } from '../../../services/firestore/firestoreService'; // Importa la función de Firestore
import { ThemedView } from '@/components/ThemedView';
import Loader from '@/components/Loader';
import { useSignOut } from '@/services/auth/useSignOut';

const Profile = () => {
  const user = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { signOut, isLoading } = useSignOut();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.uid) {
          const data = await getUserDocument(user.uid);
          setUserData(data);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: user?.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
          }}
          style={styles.profileImage}
        />
        <ThemedText style={{ ...styles.text, textAlign: 'center' }}>Avatar</ThemedText>
      </View>
      <ThemedText style={styles.h1}>Información</ThemedText>
      <ThemedText style={{ ...styles.text, fontWeight: 'bold', marginBottom: 0 }}>Email:</ThemedText>
      <ThemedText style={styles.text}>{user?.email}</ThemedText>
      <ThemedText style={{ ...styles.text, fontWeight: 'bold', marginBottom: 0 }}>Nombre:</ThemedText>
      <ThemedText style={styles.text}>
        {userData?.displayName ? userData.displayName : 'Elige su nombre'}
      </ThemedText>

      <ThemedText style={{...styles.h1, marginTop:17}}>Tus Grupos:</ThemedText>
      <ThemedText style={styles.text}>Lista de grupos (pronto)</ThemedText>

      <ThemedText style={{...styles.h1, marginTop:17}}>Invitaciónes:</ThemedText>
      <ThemedText style={styles.text}>Lista de invitaciónes (pronto)</ThemedText>
      <View style={{ flex:1 }}/>
      <StyledButton
        bgcolor="red"
        title="Cerrar Sesión"
        isLoading={isLoading}
        onPress={signOut}
      />
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  section: {
    marginVertical: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});