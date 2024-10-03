import { View, Text, StyleSheet, Button } from 'react-native'
import { ThemedText } from '@/components/ThemedText';
import { Link, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import CreateGoalButton from '@/components/CreateGoalButton';

const home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const openModal = () => {(navigation as any).navigate('createGoalModal')}
    navigation.setOptions({ headerRight: () => <CreateGoalButton onPress={openModal} />, });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ThemedText>Home</ThemedText>
    </View>
  )
}

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  }
})