import React, { useState } from 'react';
import { View, Button, Switch, StyleSheet, ScrollView, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import IconPicker from '@/components/IconPicker';
import ColorPicker from '@/components/ColorPicker';
import GroupSelector from '@/components/GroupSelector';
import { useCreateGoal } from '@/hooks/useCreateGoal';
import { useUserData } from '@/hooks/useUserData'; // Hook para obtener datos del usuario
import firestore from '@react-native-firebase/firestore';
import { useUser } from '@/context/userContext';
import { router } from 'expo-router'; // Importamos el router para la navegación
import StyledButton from '@/components/StyledButton';
import { Colors } from '@/constants/Colors';
import Loader from '@/components/Loader';


const CreateGoalModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const userId = useUser(); // Aquí iría el ID del usuario autenticado

  const { userData, loading: userLoading, error: userError } = useUserData(userId!.uid);
  const { createGoalDocument, loading: goalLoading, error: goalError } = useCreateGoal();

  // Función para manejar la selección de grupos
  const toggleGroupSelection = (groupId: string) => {
    setSelectedGroups((prevGroups) =>
      prevGroups.includes(groupId)
        ? prevGroups.filter((id) => id !== groupId)
        : [...prevGroups, groupId]
    );
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    if (!userData) return;

    const goalRef = firestore().collection('goals').doc();

    const newGoal = {
      goalId: goalRef.id,
      userId: userData.user_id,
      title,
      description,
      color,
      icon,
      isShared: selectedGroups,
    };

    await createGoalDocument(newGoal);

    if (goalError) {
      Alert.alert('Error', goalError);
    } else {
      setTitle('');
      setDescription('');
      setColor('');
      setIcon('');
      setSelectedGroups([]);
      Alert.alert('Éxito', '¡Objetivo creado exitosamente!');
      router.back();
    }
  };

  if (userLoading) {
    return (
      <Loader/>
    );
  }

  if (userError) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>{userError}</ThemedText>
      </ThemedView>
    );
  }

  // Transformamos el array de grupos de strings a objetos con id y name
  const transformedGroups = userData?.groups.map((group) => ({
    id: group, // Usamos el string como id
    name: group, // Asignamos el mismo string como nombre, ya que no tienes un nombre separado
  })) || [];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <ThemedText style={styles.label}>Título</ThemedText>
        <ThemedTextInput
          style={styles.input}
          placeholder="Título del objetivo"
          value={title}
          onChangeText={setTitle}
        />

        <ThemedText style={styles.label}>Descripción</ThemedText>
        <ThemedTextInput
          style={styles.input}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
        />

        <ColorPicker selectedColor={color} onSelectColor={setColor} />

        <ThemedText style={styles.label}>Selecciona un icono</ThemedText>
        <IconPicker selectedIcon={icon} onSelectIcon={setIcon} />

        <GroupSelector
          userGroups={transformedGroups} // Pasamos los grupos transformados
          selectedGroups={selectedGroups}
          onToggleGroup={toggleGroupSelection}
        />
        <View style={{flex: 1}} />
        <StyledButton isLoading={goalLoading} title='CREAR GOAL' bgcolor={Colors.gColors.primary} onPress={handleSubmit} />

      </ScrollView>
    </ThemedView>
  );
};

export default CreateGoalModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40
  },
  scrollViewContent: {
    flexGrow: 1, // Esto asegura que el contenido del ScrollView llene toda la pantalla
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});