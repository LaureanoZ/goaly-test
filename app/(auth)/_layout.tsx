import { Stack } from 'expo-router';

import { Tabs } from 'expo-router';
// Asegúrate de tener tu componente de modal




export default function RootNavigator() {
  return (
    <Stack>
      {/* Las tabs como la navegación principal */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }} // Ocultamos el header del stack
      />
      {/* Modal */}
      <Stack.Screen
        name="createGoalModal"
        options={{
          presentation: 'modal', // Modal behavior
          title: 'Crea un Goaly', // Título del modal
        }}
      />
    </Stack>
  );
}