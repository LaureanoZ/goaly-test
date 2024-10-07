import { Stack } from 'expo-router';

export default function RootNavigator() {
  return (
    <Stack>
      {/* Las tabs como la navegación principal */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      {/* Modal */}
      <Stack.Screen
        name="createGoalModal"
        options={{
          presentation: 'modal',
          title: 'Crea un GOAL',
        }}
      />
    </Stack>
  );
}