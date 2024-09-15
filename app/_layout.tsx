import { Stack } from "expo-router";
import "react-native-reanimated";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="singup"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="singin"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="(authenticated)/board"
          options={{
            gestureEnabled: false,
            headerTitle: "Mon Tableau",
            // headerRight: () => <Text>Right</Text>,
            // headerLeft: () => <Text>Left</Text>,
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: "#3366FF",
            },
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>

      {/* <HomeScreen /> */}
    </ApplicationProvider>
  );
}
