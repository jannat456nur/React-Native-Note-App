

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Edit from "./src/screens/Edit";
import Create from "./src/screens/Create";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpNP6MXJMjOusU1BwxkrFHk4fFwOW72o4",
  authDomain: "note-app-10d57.firebaseapp.com",
  projectId: "note-app-10d57",
  storageBucket: "note-app-10d57.appspot.com",
  messagingSenderId: "129366588583",
  appId: "1:129366588583:web:e870140b4b5f8437686f82",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);



const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: "#fff",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const user = false; //not authenticated
  return (
    
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Edit" component={Edit}></Stack.Screen>
            <Stack.Screen name="Create" component={Create}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Signin" component={SignIn}></Stack.Screen>
            <Stack.Screen name="Signup" component={SignUp}></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});