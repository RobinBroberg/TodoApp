import { TodosProvider } from "@/contexts/TodosContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TodosProvider>
      <Stack />
    </TodosProvider>
  );
}
