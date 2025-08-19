import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTasks, updateTask, deleteTask } from "../utils/api";
import TaskCard from "../components/TaskCard";

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  // 🔹 Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const res = await getTasks(token);
        setTasks(res);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // 🔹 Run when screen loads or refocuses
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchTasks);
    return unsubscribe;
  }, [navigation]);

  // 🔹 Toggle Task Completion
  const toggleTask = async (id, completed) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await updateTask(id, { completed: !completed }, token);
      await fetchTasks(); // refresh tasks from backend
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // 🔹 Delete Task
  const removeTask = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await deleteTask(id, token);
      await fetchTasks(); // refresh tasks after delete
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Your Tasks</Text>
       
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            navigation={navigation} 
            onToggle={() => toggleTask(item._id, item.completed)}
            onDelete={() => removeTask(item._id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks found. Add one!</Text>
        }
      />

      {/* Floating Add Task Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 16,
  },

  header: { fontSize: 24, fontWeight: "bold" },

  logoutBtn: {
    position: "absolute",
    bottom: 29,     
    left: 20,        
    backgroundColor: "#F44336",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 6,
    
  },

  logoutText: { color: "#fff", fontSize: 14, fontWeight: "bold" },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  fabText: { color: "#fff", fontSize: 28, fontWeight: "bold" },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
