import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";

export default function SignIn({navigation}) {
  return (
    <>
      <View style={{flex:1}}>
        <Image
          source={require("../../assets/login.jpg")}
          resizeMode="contain"
          style={{ width: 350, height: 300, alignSelf: "center",borderRadius:10 }}
        ></Image>
        <Text style={{ fontsize: 18, fontWeight: "bold", textAlign: "center" ,marginTop:20}}>
          Never forget your notes
        </Text>
        <View style={{ paddingHorizontal: 18, paddingVertical: 25 }}>
          <Input  placeholder="Email" />
          <Input
            placeholder="Password"
            secureTextEntry
          />
        </View>
   
      </View>
      <View style={styles.text}>
      <Button
          title={"Sign in"}
          customStyles={{ alignSelf: "center", marginBottom: 40 }}
        ></Button>
        <Pressable onPress={()=>{navigation.navigate("Signup")}}>
          <Text >Don't have an account?{""}<Text style={{color:"green",fontWeight:"bold",marginLeft:20}}>Sign Up</Text></Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 20,
  },
  text: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
