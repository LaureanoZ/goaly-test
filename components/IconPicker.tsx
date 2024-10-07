import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor'; // Usamos el hook para obtener el color dinámico

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
}

// Definimos un tipo explícito para los nombres de íconos que vamos a utilizar
type IonIconNames =
  | 'heart-outline'
  | 'star-outline'
  | 'alarm-outline'
  | 'leaf-outline'
  | 'flame-outline'
  | 'paw-outline'
  | 'basketball-outline'
  | 'musical-notes-outline'
  | 'book-outline'
  | 'build-outline';

const IconPicker: React.FC<IconPickerProps> = ({ selectedIcon, onSelectIcon }) => {
  const ionIconOptions: IonIconNames[] = [
    'heart-outline',
    'star-outline',
    'alarm-outline',
    'leaf-outline',
    'flame-outline',
    'paw-outline',
    'basketball-outline',
    'musical-notes-outline',
    'book-outline',
    'build-outline'
  ];

  // Obtenemos el color basado en el tema (negro para tema claro, blanco para tema oscuro)
  const iconColor = useThemeColor({}, 'text'); 

  return (
    <View style={styles.iconContainer}>
      {ionIconOptions.map((iconOption) => (
        <Ionicons
          key={iconOption}
          name={iconOption}
          size={40}
          color={iconColor} // Aplica el color basado en el tema
          style={[
            styles.iconOption,
            selectedIcon === iconOption && styles.selectedIconOption,
          ]}
          onPress={() => onSelectIcon(iconOption)}
        />
      ))}
    </View>
  );
};

export default IconPicker;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  iconOption: {
    margin: 10,
  },
  selectedIconOption: {
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
  },
});