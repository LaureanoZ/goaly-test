import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

interface UserData {
  user_id: string;
  displayName: string;
  email: string;
  photoURL: string;
  goals: string[];
  groups: string[];
  invitations: string[];
}

export const useUserData = (userId: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          setUserData(userDoc.data() as UserData);
        } else {
          setError('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return { userData, loading, error };
};