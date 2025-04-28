// Import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// Import React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import network detection
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { Alert } from "react-native";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5-bxdQJUPJbiRqYhzDoH1AQwhJ67XlME",
  authDomain: "chatapp-2a559.firebaseapp.com",
  projectId: "chatapp-2a559",
  storageBucket: "chatapp-2a559.firebasestorage.app",
  messagingSenderId: "919736788721",
  appId: "1:919736788721:web:9eab2b8b0f7cf6746f2b50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const storage = getStorage(app);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat {...props} db={db} storage={storage} isConnected={connectionStatus.isConnected} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
