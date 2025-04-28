import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#090C08');

  // Function to sign in anonymously
  const signInUser = () => {
    const auth = getAuth(); // Initialize Firebase authentication instance
    signInAnonymously(auth) // Attempt anonymous sign-in
      .then((userCredential) => {
        const userId = userCredential.user.uid; // Retrieve the unique user ID
        navigation.navigate('Chat', { userId, name, color }); // Navigate to Chat screen, passing user details
      })
      .catch(error => {
        console.error("Error signing in anonymously:", error); // Log errors if sign-in fails
      });
  };

  return (
    <ImageBackground 
      source={require('../assets/background-image.png')} // Ensure this image exists in the specified path
      style={styles.container}
    >
      <Text style={styles.title}>Chat App</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#000000"
        onChangeText={setName} // Updates the `name` state on user input
        value={name}
      />
      
      <Text style={styles.label}>Choose Background Color</Text>

      <View style={styles.colorOptions}>
        {/* Render color selection buttons dynamically */}
        {['#090C08', '#474056', '#8A95A5', '#B9C6AE'].map((bgColor) => (
          <TouchableOpacity
            key={bgColor}
            style={[styles.colorButton, { backgroundColor: bgColor }]} // Apply color dynamically
            onPress={() => setColor(bgColor)} // Update the `color` state when clicked
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={signInUser}>
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000000',
  },
  label: {
    fontSize: 16,
    fontWeight: '300',
    color: '#000000',
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row', // Arrange color buttons in a horizontal row
    marginBottom: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 25, // Make buttons circular
  },
  button: {
    backgroundColor: '#757083',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
