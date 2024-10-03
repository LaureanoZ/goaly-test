import { View, Text, StyleSheet, Button, useWindowDimensions } from 'react-native'
import { ThemedText } from '@/components/ThemedText';
import { Link, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import CreateGoalButton from '@/components/CreateGoalButton';
import { ThemedView } from '@/components/ThemedView';
import ThemeIcon from '@/components/ThemeIcon';

const home = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    const openModal = () => { (navigation as any).navigate('createGoalModal') }
    navigation.setOptions({ headerRight: () => <CreateGoalButton onPress={openModal} />, });
  }, [navigation]);
  return (
    <ThemedView style={styles.container}>
      <View style={{
        width: width - 40,
        ...styles.card
      }}>
        <View style={{marginStart: 20}}>
          <ThemeIcon iconName='laptop-outline' iconColor='black' iconSize={30} />
        </View>
        <View style={{marginStart: 10}}>
          <Text style={{fontSize: 17}}>Estudiar programación</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{marginEnd: 20}}>
          <ThemeIcon iconName='ellipse-outline' iconColor='black' iconSize={30} />
        </View>
      </View>
    </ThemedView>
  )
}

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    height: 80,
    backgroundColor: '#ffe1ee',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
})