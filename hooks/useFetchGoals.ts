import { useState, useEffect } from 'react';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  isShared: string[];
  streak: number;
  isDone: boolean;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  maxStreak: number;
  totalDays: number;
  totalComplete: number;
}

export const useFetchGoals = (userId?: string) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    setLoading(true);
    setError(null);

    try {
      let query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> = firestore().collection('goals');
      
      if (userId) {
        query = query.where('user_id', '==', userId); // Aquí hacemos la consulta con `where`
      }

      const snapshot = await query.get();
      const goalsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Goal[];

      setGoals(goalsList);
    } catch (error) {
      console.error('Error fetching goals:', error);
      setError('No se pudieron obtener los goals desde Firestore.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchGoals();
    }
  }, [userId]);

  return { goals, loading, error, refetch: fetchGoals }; // Devuelve la función refetch para poder usarla en el "pull to refresh"
};