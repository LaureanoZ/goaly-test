import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { ThemedText } from './ThemedText';

interface GroupSelectorProps {
  userGroups: { id: string; name: string }[];
  selectedGroups: string[];
  onToggleGroup: (groupId: string) => void;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({ userGroups, selectedGroups, onToggleGroup }) => {
  return (
    <View>
      <ThemedText style={styles.label}>¿Quieres compartirlo?</ThemedText>

      {userGroups.length === 0 ? ( // Condición si no hay grupos
        <ThemedText>¡Únete a un grupo para compartir!</ThemedText>
      ) : (
        userGroups.map((group) => (
          <View key={group.id} style={styles.checkboxContainer}>
            <Checkbox
              value={selectedGroups.includes(group.id)}
              onValueChange={() => onToggleGroup(group.id)}
              style={styles.checkbox}
            />
            <ThemedText>{group.name}</ThemedText>
          </View>
        ))
      )}
    </View>
  );
};

export default GroupSelector;

const styles = StyleSheet.create({
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    marginRight: 10,
  },
});