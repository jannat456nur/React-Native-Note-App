import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../App";
// import { AntDesign } from "@expo/vector-icons";

export default function Home({ navigation, route, user }) {
  // console.log("user -----", user);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    //create the query
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));

    //create the listener to the query that we just made
    const notesListenerSubcription = onSnapshot(q, (QuerySnapshot) => {
      console.log("querysnapshot", QuerySnapshot);
      const list = [];
      QuerySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setNotes(list);
    });
    return notesListenerSubcription;
  }, []);

  console.log("Notes", notes);

  const renderItem = ({ item }) => {
    const { title, description, color } = item;
    return (
      <Pressable
        style={{
          height: 60,
          backgroundColor: color,
          marginBottom: 25,
          borderRadius: 15,
          padding: 15,
        }}
        onPress={() => {
          navigation.navigate("edit", { item });
        }}
      >
        {/* Delete doc */}
        <Pressable
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            padding: 15,
            zIndex: 4,
          }}
          onPress={() => {
            deleteDoc(doc(db, "notes", item.id));
          }}
        >
          <AntDesign name="delete" size={24} color="red" />
        </Pressable>
        <Text style={{ color: "white", fontSize: 20 }}>{item.title}</Text>

        <Text style={{ color: "white", fontSize: 15 }}>{item.description}</Text>
      </Pressable>
    );
  };

  const onPressCreate = () => {
    navigation.navigate("create");
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          justifyContent: "space-between",
          marginLeft: 30,
        }}
      >
        <Text>My Notes</Text>
        <Pressable onPress={onPressCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtrator={(item) => item.title}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}
