import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { ThemedText } from './ThemedText';
import ThemeIcon from './ThemeIcon';
import { createUserDocument } from '../services/firestore/firestoreService'; // Asegúrate de importar esta función

const GoogleSignInButton = () => {
  GoogleSignin.configure({
    webClientId: '426639268045-6mlgf4fuliogukem40mf4rec72rjoi1o.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const { user, additionalUserInfo } = await auth().signInWithCredential(googleCredential);

      // Verificamos si es un nuevo usuario
      if (additionalUserInfo?.isNewUser) {
        // Si es nuevo, creamos el documento en Firestore
        await createUserDocument(user.uid, user.email || '', user.photoURL || '', user.displayName || '');

        // Opcional: puedes mostrar una alerta informando que el documento ha sido creado
        Alert.alert(
          'Bienvenido',
          'Tu cuenta ha sido creada exitosamente. Ya puedes utilizar la aplicación.'
        );
      }

      console.log('Signed in with Google!');

    } catch (err) {
      console.error('Registration with Google failed', err);
      Alert.alert('Error', 'No se pudo iniciar sesión con Google: ');
    }
  }

  return (
    <Pressable style={styles.button} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
      <View style={styles.container}>
        <View>
          <ThemeIcon iconName='logo-google' iconColor='#DB4437' iconSize={25} />
        </View>
        <ThemedText style={styles.text}>Continuar con Google</ThemedText>
      </View>
    </Pressable>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  text: {
    paddingLeft: 10,
  }
});