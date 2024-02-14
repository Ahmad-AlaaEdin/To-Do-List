import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper";
import { updateStatus } from "../database";
const Task = ({ item, setRefresh }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        backgroundColor: "rgba(192,192,192,0.1)",
        padding: 10,
        margin: 5,
        borderRadius: 10,
      }}
    >
      <Checkbox
        status={item.status ? "checked" : "unchecked"}
        color="grey"
        onPress={() => {
          updateStatus(item.ID, item.status ? 0 : 1).then(() => {
            setRefresh(true);
            console.log("dsad");
          });
        }}
      />
      <Text style={item.status && styles.text}>{item.task}</Text>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  text: {
    textDecorationStyle: "solid",
    textDecorationLine: "line-through",
  },
});
