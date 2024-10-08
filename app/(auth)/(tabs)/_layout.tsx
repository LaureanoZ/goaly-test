import ThemeIcon from '@/components/ThemeIcon';
import { Colors } from '@/constants/Colors'
import { Tabs } from 'expo-router';
import CreateGoalButton from '@/components/CreateGoalButton';
import HeaderLogo from '@/components/HeaderLogo';

export default function TabLayout() {
  const iconColor = Colors.gColors.primary;
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: iconColor,
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false
    }}>
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Grupos',
          tabBarIcon: ({ color }) => <ThemeIcon iconColor={color} iconName='people-outline' iconSize={28} />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: props => <HeaderLogo />,
          tabBarIcon: ({ color }) => <ThemeIcon iconColor={color} iconName='home' iconSize={28} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <ThemeIcon iconColor={color} iconName='person-circle-outline' iconSize={28} />,

        }}
      />
    </Tabs >

  );
}