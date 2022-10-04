import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Edit from "./src/screens/Edit";
import Create from "./src/screens/Create";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAoQVkvaruVpVCqniNpNOi_tO_4bynWyOQ",
  authDomain: "react-native-1stproject.firebaseapp.com",
  projectId: "react-native-1stproject",
  storageBucket: "react-native-1stproject.appspot.com",
  messagingSenderId: "857184351194",
  appId: "1:857184351194:web:ee3362f12fc974415d06e3"
};

const app = initializeApp(firebaseConfig);




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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
