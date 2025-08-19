import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker"; // ✅ install this package
import { addTask } from "../utils/api";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium"); // default
  const [category, setCategory] = useState("General"); // default

  const handleAddTask = async () => {
    const token = await AsyncStorage.getItem("token");
    const task = { title, description, deadline, priority, category };
    const res = await addTask(task, token);
    if (res._id) {
      navigation.goBack();
    } else {
      alert("Error adding task");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>
 
      {/* Title */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      {/* Deadline */}
      <Text style={styles.label}>Deadline</Text>
      <TextInput
        placeholder="Deadline (YYYY-MM-DD)"
        style={styles.input}
        value={deadline}
        onChangeText={setDeadline}
      />

      {/* Priority Picker */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
        >
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>
      </View>

      {/* Category Picker */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="General" value="General" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Study" value="Study" />
          <Picker.Item label="Health" value="Health" />
        </Picker>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.btn} onPress={handleAddTask}>
        <Text style={styles.btnText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: { fontSize: 16, marginBottom: 6, fontWeight: "500" },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  btn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
