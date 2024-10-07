import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onSelectColor }) => {
  const pastelColors = ['#FFC0CB', '#FFD700', '#ADD8E6', '#90EE90', '#FFB6C1', '#FFFFE0'];

  return (
    <View>
      <ThemedText style={styles.label}>Selecciona un color</ThemedText>
      <View style={styles.colorContainer}>
        {pastelColors.map((colorOption) => (
          <View
            key={colorOption}
            style={[
              styles.colorOption,
              selectedColor === colorOption && styles.selectedColorOption,
              { backgroundColor: colorOption },
            ]}
            onTouchEnd={() => onSelectColor(colorOption)} // Seleccionar color al tocar
          />
        ))}
      </View>
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedColorOption: {
    borderColor: '#000',
    borderWidth: 2,
  },
});