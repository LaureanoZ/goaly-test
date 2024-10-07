import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import ThemeIcon from '@/components/ThemeIcon';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface GoalCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  isCompleted: boolean;
  color: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ icon, title, isCompleted: initialCompleted, color }) => {
  const { width } = useWindowDimensions();
  const [isCompleted, setIsCompleted] = useState(initialCompleted);

  const toggleCompletion = () => {
    setIsCompleted(prevState => !prevState);
  };

  return (
    <View style={[styles.card, { width: width - 40, backgroundColor: color }]}>
      <View style={styles.iconContainer}>
        <ThemeIcon iconName={icon} iconColor='black' iconSize={30} />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={{
            fontSize: 17,
            textDecorationLine: isCompleted ? 'line-through' : 'none',
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title.length > 20 ? `${title.substring(0, 20)}...` : title}
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <Pressable style={styles.pressableIcon} onPress={toggleCompletion}>
        <ThemeIcon
          iconName={isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
          iconColor={isCompleted ? Colors.gColors.primary : 'black'}
          iconSize={30}
        />
      </Pressable>
    </View>
  );
};

export default GoalCard;

const styles = StyleSheet.create({
  card: {
    height: 80,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginStart: 20,
  },
  textContainer: {
    marginStart: 10,
  },
  pressableIcon: {
    marginEnd: 20,
  },
});