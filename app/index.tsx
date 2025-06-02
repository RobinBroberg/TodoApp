import { useTodos } from "@/contexts/TodosContext";
import { useRouter } from "expo-router";
import {
  SectionList,
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

  const sections = [
    {
      title: "Todos",
      data: todos.filter((todo: any) => !todo.done),
    },
    {
      title: "Completed",
      data: todos.filter((todo: any) => todo.done),
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigate(item)}
            style={styles.todoItem}
          >
            <Text style={item.done ? styles.completedText : styles.todoText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
  },
  todoItem: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginVertical: 6,
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#888",
  },
});
