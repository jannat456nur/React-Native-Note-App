import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const genderOptions = ["Male", "Female"];

export default function SignUp() {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");

  const auth = getAuth();
  
  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user,"user")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontsize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 15,
          }}
        >
          Never forget your notes
        </Text>
        <View style={{ paddingHorizontal: 18, paddingVertical: 25 }}>
          <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
          <Input
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="Full Name"
            onChangeText={(text) => setName(text)}
          />
          <Input placeholder="Age" onChangeText={(text) => setAge(text)} />

          <View>
            <Text style={{ marginVertical: 20, fontSize: 20 }}>
              Select Gender
            </Text>
          </View>

          {genderOptions.map((option) => {
            const selected = option === gender;
            return (
              <Pressable
                onPress={() => setGender(option)}
                key={option}
                style={styles.radioContainer}
              >
                <View
                  style={[
                    styles.outerCircle,
                    selected && styles.selectedOuterCircle,
                  ]}
                >
                  <View
                    style={[
                      styles.innerCircle,
                      selected && styles.selectedInnerCircle,
                    ]}
                  ></View>
                </View>
                <Text style={styles.radioText}>{option}</Text>
              </Pressable>
            );
          })}

          {/* <Pressable style={styles.radioContainer}>
            <View
              style={[
                styles.outerCircle,
                selected && styles.selectedOuterCircle,
              ]}
            >
              <View
                style={[
                  styles.innerCircle,
                  selected && styles.selectedInnerCircle,
                ]}
              ></View>
            </View>
            <Text style={styles.radioText}>Female</Text>
          </Pressable> */}
        </View>
      </View>
      <View style={styles.text}>
        <Button
          title={"Sign up"}
          customStyles={{ alignSelf: "center", marginBottom: 40 }}
          onPress={signup}
        ></Button>
        <Pressable >
          <Text>
            Already have an account?{""}
            <Text
              style={{ color: "green", fontWeight: "bold", marginLeft: 20 }}
            >
              Sign In
            </Text>
          </Text>
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
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "cfcfcf",
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "cfcfcf",
    marginRight: 2,
  },
  radioText: {
    marginLeft: 10,
  },
  selectedOuterCircle: {
    borderColor: "orange",
  },
  selectedInnerCircle: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
});
