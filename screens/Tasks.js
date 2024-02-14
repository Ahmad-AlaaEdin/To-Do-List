import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import TaskModal from "../components/TaskModal";
import Task from "../components/Task";
import CalendarModal from "../components/CalendarModal";
import MenuBtn from "../components/MenuBtn";
import { getTasks } from "../database";
const Tasks = () => {
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
        setRefresh(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          setVisible(true);
        }}
      >
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <Task item={item} setRefresh={setRefresh} />}
        keyExtractor={(item) => item.ID}
      />
      <TaskModal
        visible={visible}
        setVisible={setVisible}
        setRefresh={setRefresh}
      />
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#7DABF6",
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    bottom: 10,
    zIndex: 100,
  },
});
