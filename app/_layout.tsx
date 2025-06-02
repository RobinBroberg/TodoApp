import { TodosProvider } from "@/contexts/TodosContext";
import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";

function AddButton() {
  const router = useRouter();
  return (
    <Button onPress={() => router.push("/add")} title="Add" color="#fff" />
  );
}

export default function RootLayout() {
  return (
    <TodosProvider>
      <Stack
        screenOptions={{
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: "#1e3a8a",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 26,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Todos", headerRight: () => <AddButton /> }}
        />
        <Stack.Screen
          name="add"
          options={{ title: "New Todo", presentation: "modal" }}
        />
      </Stack>
    </TodosProvider>
  );
}
