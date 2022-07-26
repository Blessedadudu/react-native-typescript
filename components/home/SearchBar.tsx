import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SearchBar({ cityHandler }: { cityHandler: (textValue: string) => void }) {
  const [textValue, setTextValue] = useState("");
  return (
    <View style={{ marginTop: 15, flexDirection: "row" }}>
      <TextInput
        style={{
          backgroundColor: "#eee",
          fontWeight: "700",
          marginTop: 7,
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
          marginRight: 10,
          width: "100%",
          height: 50,
          paddingHorizontal: 20,
        }}
        onChangeText={setTextValue}
        value={textValue}
        placeholder="Search"
      />
      <View
        style={{
          flexDirection: "row",
          marginRight: 8,
          backgroundColor: "white",
          position: "absolute",
          right: 0,
          bottom: 7,
          padding: 9,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <AntDesign name="clockcircle" size={11} style={{ marginRight: 6 }} />
        <TouchableOpacity disabled={textValue.length === 0}>
          <Text onPress={() => cityHandler(textValue)}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
