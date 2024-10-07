import firestore, { Timestamp } from '@react-native-firebase/firestore';

export const createUserDocument = async (userId: string, email: string, photoURL: string, displayName: string) => {
  try {
    await firestore().collection('users').doc(userId).set({
      user_id: userId,
      displayName: displayName || '',
      email: email,
      photoURL: photoURL || '',
      goals: [],
      groups: [],
      invitations: [] 
    });
  } catch (error) {
    console.error("Error creating user document:", error);
    throw new Error('No se pudo crear el documento del usuario en Firestore.');
  }
};
export const getUserDocument = async (userId: string) => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();

    if (userDoc.exists) {
      return userDoc.data();
    } else {
      console.log('No se encontró el documento del usuario.');
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo el documento del usuario:", error);
    throw new Error('No se pudo obtener el documento del usuario en Firestore.');
  }
};