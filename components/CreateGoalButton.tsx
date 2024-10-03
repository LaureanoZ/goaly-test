import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface Props {
  onPress?: () => void;
}

const CreateGoalButton = ({ onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
        ...styles.button,
        backgroundColor: Colors.gColors.primary,
        opacity: pressed ? 0.8 : 1
      }
      ]}
      onPress={onPress}
    >
      <Ionicons name='add-outline' size={20} color='white' />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginEnd: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default CreateGoalButton;