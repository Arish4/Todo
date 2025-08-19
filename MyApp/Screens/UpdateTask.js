import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateTask } from "../utils/api";

export default function UpdateTask({ route, navigation }) {
  const { task } = route.params;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category || "");
  const [priority, setPriority] = useState(task.priority);
  const [deadline, setDeadline] = useState(task.deadline);

  const handleSave = async () => {
    const updatedTask = { title, description, category, priority, deadline };

    try {
      const token = await AsyncStorage.getItem("token");
      await updateTask(task._id, updatedTask, token); // API call
      Alert.alert("Success", "Task updated successfully");
      navigation.goBack(); // go back to task list
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update task");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Task</Text>

      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Category" />
      <TextInput style={styles.input} value={priority} onChangeText={setPriority} placeholder="Priority (low, medium, high)" />
      <TextInput style={styles.input} value={deadline} onChangeText={setDeadline} placeholder="Deadline (YYYY-MM-DD HH:mm)" />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 15 },
  saveBtn: { backgroundColor: "#2196F3", padding: 15, borderRadius: 10, alignItems: "center" },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
