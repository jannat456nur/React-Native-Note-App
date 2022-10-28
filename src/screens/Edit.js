import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import { showMessage } from "react-native-flash-message";

const noteColorOption = ["pink", "slateblue", "lightgray"];
export default function Create({ navigation, route, user }) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  // console.log("user uid", user.uid);



  const onPressUpdate = async () => {

    try {
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        color: noteColor,
        // uid: user.uid,
      });

      showMessage({
        message: "Note created successfully",
        type: "success",
      });
    } catch (err) {
      console.log(err, "err");
    }
  };

  return (
    <View style={{ marginHorizontal: 20, flex: 1 }}>
      <Input
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <Input
        placeholder="Description"
        multiline={true}
        value={description}
        onChangeText={(text) => setDescription(text)}
        secureTextEntry
      />
      {/* {noteColorOption.map((option, index) => (
        <RadioInput
          key={index}
          label={option}
          value={noteColor}
          setValue={setNoteColor}
        />
      ))} */}
      <View style={{ height: 50 }}>
        <Text>Select your note color</Text>
      </View>
      {noteColorOption.map((option, index) => {
        const selected = option === noteColor;
        return (
          <Pressable
            key={option}
            // label={option}
            // value={noteColor}
            // setValue={setNoteColor}
            style={styles.radioContainer}
            onPress={() => setNoteColor(option)}
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
      <Button
        title={"Submit"}
        customStyles={{ alignSelf: "center", marginBottom: 40, marginTop: 50 }}
        onPress={onPressUpdate}
      ></Button>
    </View>
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
