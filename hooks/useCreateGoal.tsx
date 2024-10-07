import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Timestamp } from '@react-native-firebase/firestore';

interface GoalData {
  goalId: string;
  userId: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  isShared: string[]; // Array de grupos
}

export const useCreateGoal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGoalDocument = async ({
    goalId,
    userId,
    title,
    description,
    color,
    icon,
    isShared,
  }: GoalData) => {
    setLoading(true);
    setError(null);
    try {
      await firestore().collection('goals').doc(goalId).set({
        user_id: userId,
        goal_id: goalId,
        title: title,
        description: description,
        isShared: isShared || [],
        streak: 0,
        color: color,
        icon: icon,
        isDone: false,
        createdAt: Timestamp.now(),
        maxStreak: 0,
        totalDays: 0,
        totalComplete: 0,
      });
    } catch (error) {
      console.error('Error creating goal document:', error);
      setError('No se pudo crear el documento del goal en Firestore.');
    } finally {
      setLoading(false);
    }
  };

  return { createGoalDocument, loading, error };
};