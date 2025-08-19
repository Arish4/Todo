import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../utils/api";
import { Video } from "expo-av"; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try{
    const res = await loginUser(email, password);
    if (res.token) {
      await AsyncStorage.setItem("token", res.token);
      navigation.replace("Tasks");
    } else if(res.message === "No email found please register" ){
       alert("please register no email found")
    }else if(res.message=== "Wrong password"){
      alert("wrong password")
    }else {
      alert(res.message || "Login failed");
    }} catch(err){
      alert('something went wrong');
    }
  };

  return (
    <View style={styles.container}>
   
      <Video
        source={require("../assets/todo.mp4")}
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
      />

      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text>No account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "blue" }}>Register</Text>
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
  btn: {  backgroundColor: "#2196F3", padding: 12,borderRadius: 22, marginTop: 10, width: "40%",alignItems: "center" },
  btnText: { color: "#fff", fontSize: 16 }
});
