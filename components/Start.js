import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#090C08");

  const signInUser = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        navigation.navigate("Chat", { userId, name, color });
      })
      .catch((error) => {
        console.error("Error signing in anonymously:", error);
      });
  };

  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  return (
    <ImageBackground
      source={require("../assets/background-image.png")}
      style={styles.backgroundImage}
    >
      <Text style={styles.appTitle}>App Title</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.nameInput}
          onChangeText={setName}
          value={name}
          placeholder="Your Name"
          placeholderTextColor="rgba(117, 80, 131, 0.5)"
        />
        <Text style={styles.colorText}>Choose Background Color:</Text>
        <View style={styles.colorOptions}>
          {colors.map((bgColor) => (
            <Pressable
              key={bgColor}
              style={[
                styles.colorCircle,
                { backgroundColor: bgColor },
                color === bgColor && styles.selectedCircle,
              ]}
              onPress={() => setColor(bgColor)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={signInUser}>
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    width: "88%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 5,
  },
  nameInput: {
    borderColor: "#757083",
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
    width: "100%",
    padding: 10,
    marginBottom: 20,
  },
  colorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedCircle: {
    borderWidth: 3,
    borderColor: "#5A5A5A",
  },
  button: {
    backgroundColor: "#757083",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default Start;
