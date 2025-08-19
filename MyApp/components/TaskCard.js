import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function TaskCard({ task, onToggle, onDelete }) {
  const priorityColors = { low: "#4CAF50", medium: "#FFC107", high: "#F44336" };

  return (
    <Animated.View 
      style={[styles.card, { borderLeftColor: priorityColors[task.priority] }]}
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
    >
      <TouchableOpacity onPress={onToggle} style={{ flex: 1 }}>
        <Text style={[styles.title, task.completed && { textDecorationLine: "line-through" }]}>
          {task.title}
        </Text>
        <Text style={styles.desc}>{task.description}</Text>

       
        {task.category && (
          <Text style={styles.category}>Category: {task.category}</Text>
        )}

        <Text style={styles.deadline}>
          Deadline: {new Date(task.deadline).toLocaleString()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>🗑</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderLeftWidth: 6,
    elevation: 3
  },
  title: { fontSize: 18, fontWeight: "bold" },
  desc: { fontSize: 14, color: "#555" },
  category: { fontSize: 13, color: "#2196F3", marginTop: 4, fontStyle: "italic" }, // 👈 styled
  deadline: { fontSize: 12, color: "#888", marginTop: 4 },
  delete: { fontSize: 20, marginLeft: 10 }
});