import { useTodos } from "@/contexts/TodosContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function TodoDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { todos, markDone, deleteTodo } = useTodos();

  const todo = todos.find((t: any) => t.id === id);

  if (!todo) return <Text style={styles.errorText}>Todo not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={styles.description}>{todo.description}</Text>
      <Text style={styles.status}>
        Status:{" "}
        <Text style={{ fontWeight: "bold" }}>
          {todo.done ? "Done" : "Not done"}
        </Text>
      </Text>

      {!todo.done && (
        <View style={styles.buttonSpacing}>
          <Button
            title="Mark as Done"
            onPress={() => {
              markDone(todo.id);
              router.back();
            }}
          />
        </View>
      )}

      <Button
        title="Delete"
        color="red"
        onPress={() => {
          deleteTodo(todo.id);
          router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonSpacing: {
    marginBottom: 12,
  },
  errorText: {
    padding: 20,
    fontSize: 18,
    color: "red",
  },
});
