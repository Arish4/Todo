import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTasks, updateTask, deleteTask } from "../utils/api";
import TaskCard from "../components/TaskCard";

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const res = await getTasks(token);
        setTasks(res);
      }
    };
    const unsubscribe = navigation.addListener("focus", fetchTasks);
    return unsubscribe;
  }, [navigation]);

  const toggleTask = async (id, completed) => {
    const token = await AsyncStorage.getItem("token");
    await updateTask(id, { completed: !completed }, token);
    const updatedTasks = tasks.map(t => t._id === id ? { ...t, completed: !completed } : t);
    setTasks(updatedTasks);
  };

  const removeTask = async (id) => {
    const token = await AsyncStorage.getItem("token");
    await deleteTask(id, token);
    setTasks(tasks.filter(t => t._id !== id));
  };

  // 🔹 Logout function
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token"); // clear saved token
    navigation.replace("Login"); // go back to login screen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Your Tasks</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskCard 
            task={item} 
            onToggle={() => toggleTask(item._id, item.completed)} 
            onDelete={() => removeTask(item._id)} 
          />
        )}
      />

      {/* Floating Add Task Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddTask")}>
        <Text style={styles.fabText}>+</Text>
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
    backgroundColor: "#F44336",
    paddingVertical: 6,
    paddingHorizontal: 12,
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

  fabText: { color: "#fff", fontSize: 28, fontWeight: "bold" }
});
