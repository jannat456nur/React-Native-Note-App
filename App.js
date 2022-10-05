import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Edit from "./src/screens/Edit";
import Create from "./src/screens/Create";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import FlashMessage from "react-native-flash-message";
import { useEffect, useState } from "react";

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
  // const user = false; //not authenticated
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // useEffect(()=>{
  //   signOut(auth)
  // })

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return authSubscription;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="create">
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="edit" component={Edit}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Signin"
              component={SignIn}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen name="Signup" component={SignUp}></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
