import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUser } from "../utils/api";
import { Video } from "expo-av"; 
export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await registerUser(email, password);
    if (res.token) {
      await AsyncStorage.setItem("token", res.token);
      navigation.replace("Tasks");
    } else {
      alert(res.message || "Registration failed");
    }
  };

  return (
    
    <View style={styles.container}>
       <Video
        source={require("../assets/todo2.mp4")} // make sure the path is correct
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
        isMuted={false} // 🔑 allow sound
      />

      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
  <Text>Already have an account? </Text>
  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    <Text style={{ color: "blue" }}>Login</Text>
  </TouchableOpacity>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
  video: { width: "100%", height: 200, marginBottom: 20 }, // adjust size
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: "80%", padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 10 },
  btn: { 
    backgroundColor: "#2196F3", 
    padding: 12, 
    borderRadius: 22, 
    marginTop: 10, 
    width: "40%",           // makes it 80% of screen width
    alignItems: "center"    // centers the text inside
  },
  btnText: { color: "#fff", fontSize: 16 }
});