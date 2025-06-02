import { useTodos } from "@/contexts/TodosContext";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TodoDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { todos, markDone, deleteTodo, toggleDone } = useTodos();

  const navigation = useNavigation();

  const todo = todos.find((todo: any) => todo.id === id);

  useLayoutEffect(() => {
    if (todo) {
      navigation.setOptions({ title: todo.title });
    }
  }, [navigation, todo]);

  if (!todo) return <Text style={styles.errorText}>Todo not found</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.description}>{todo.description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.status}>{todo.done ? "Done" : "Not done"}</Text>

        {!todo.done ? (
          <TouchableOpacity
            style={[styles.actionButton, styles.doneButton]}
            onPress={() => {
              markDone(todo.id);
              router.back();
            }}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, styles.undoButton]}
            onPress={() => {
              toggleDone(todo.id);
              router.back();
            }}
          >
            <Text style={styles.buttonText}>Undo</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => {
            deleteTodo(todo.id);
            router.back();
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  content: {
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 28,
    color: "#444",
    marginBottom: 20,
  },

  status: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonSpacing: {
    marginBottom: 16,
  },
  errorText: {
    padding: 20,
    fontSize: 18,
    color: "red",
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
  },

  doneButton: {
    backgroundColor: "#4CAF50",
  },

  undoButton: {
    backgroundColor: "#f59e0b",
  },

  deleteButton: {
    backgroundColor: "#ef4444",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
