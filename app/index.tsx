import { useTodos } from "@/contexts/TodosContext";
import { useRouter } from "expo-router";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const { todos } = useTodos();

  const handleNavigate = (item: any) => {
    router.push(`/${item.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todos</Text>

      <FlatList
        data={todos.filter((todo: any) => !todo.done)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigate(item)}
            style={styles.todoItem}
          >
            <Text style={styles.todoText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.subHeading}>Completed</Text>

      <FlatList
        data={todos.filter((todo: any) => todo.done)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.completedItem}>
            <Text style={styles.completedText}>{item.title}</Text>
          </View>
        )}
      />

      <View style={styles.buttonWrapper}>
        <Button title="Add" onPress={() => router.push("/add")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
  },
  todoItem: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 6,
  },
  todoText: {
    fontSize: 16,
  },
  completedItem: {
    padding: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginVertical: 6,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#888",
  },
  buttonWrapper: {
    marginTop: 30,
  },
});
