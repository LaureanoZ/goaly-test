import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import CreateGoalButton from '@/components/CreateGoalButton';
import { ThemedView } from '@/components/ThemedView';
import GoalCard from '@/components/GoalCard';
import { useUser } from '@/context/userContext'; // Hook para obtener el usuario autenticado
import { useFetchGoals } from '@/hooks/useFetchGoals'; // Hook para obtener los goals
import { ThemedText } from '@/components/ThemedText';
import Loader from '@/components/Loader';

const Home = () => {
  const navigation = useNavigation();
  const userId = useUser()?.uid; // Obtenemos el ID del usuario autenticado
  const { goals, loading, error, refetch } = useFetchGoals(userId); // Usamos el hook para obtener los goals

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Llamamos al método refetch para obtener los nuevos datos
    setRefreshing(false);
  };

  useEffect(() => {
    const openModal = () => { (navigation as any).navigate('createGoalModal') };
    navigation.setOptions({ headerRight: () => <CreateGoalButton onPress={openModal} />, });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      refetch(); // Refrescamos los datos cuando volvemos a la pantalla Home
    }, [])
  );
  if (loading && !refreshing) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoalCard
            title={item.title}
            icon={item.icon}
            color={item.color}
            isCompleted={item.isDone}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } // Aquí añadimos el "pull to refresh"
      />
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});