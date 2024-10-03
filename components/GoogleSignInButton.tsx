import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from './ThemedText';
import ThemeIcon from './ThemeIcon';

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
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      alert('Registration with Google failed ' + err)
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
  )
}

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