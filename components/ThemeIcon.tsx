import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconSize: number
}

const ThemeIcon = ({iconName, iconColor, iconSize}: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </View>
  );
}
export default ThemeIcon;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});