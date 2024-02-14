import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MenuBtn from "./MenuBtn";
import { Modal } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { addTask } from "../database";
const TaskModal = ({ visible, setVisible, setRefresh }) => {
  let today = new Date();
  today = `${today.getFullYear()}-${today.toLocaleString("en", {
    month: "2-digit",
  })}-${today.toLocaleString("en", {
    day: "2-digit",
  })}`;
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("No Category");
  const [date, setDate] = useState(today);
  return (
    <Modal
      transparent={true}
      visible={visible}
      dismissable={false}
      contentContainerStyle={styles.centeredView}
    >
      <View style={styles.modalView}>
        <Pressable
          style={{ position: "absolute", top: 10, right: 10 }}
          onPress={() => {
            setValue("");
            setDate(today);
            setVisible(false);
          }}
        >
          <Ionicons name="close" size={25} color="silver" />
        </Pressable>

        <TextInput
          placeholder="Input new task here"
          style={styles.input}
          multiline={true}
          value={value}
          onChangeText={(text) => setValue(text)}
          onEndEditing={this.clearFocus}
        />
        <View style={[styles.row, { width: "100%" }]}>
          <View style={styles.row}>
            <MenuBtn setSelected={setSelected} selected={selected}/>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                setShow(true);
              }}
            >
              <Ionicons name="today" size={20} color="#7DABF6" />
            </Pressable>
          </View>
          <Pressable
            disabled={!value}
            onPress={() => {
              addTask(date, value, selected)
                .then(() => {
                  setRefresh(true);
                })
                .then(() => {
                  setVisible(false);
                  setValue("");
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            <Ionicons
              name="add-circle"
              size={40}
              color={!value ? "rgba(0,0,0,0.1)" : "#7DABF6"}
            />
          </Pressable>
        </View>
      </View>
      <Modal visible={show}>
        <View
          style={{ padding: 30, backgroundColor: "white", borderRadius: 20 }}
        >
          <Calendar
            onDayPress={(date) => {
              setDate(date.dateString);
            }}
            markedDates={{
              [date]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
          />
          <View style={styles.row}>
            <Pressable
              onPress={() => {
                setShow(false);
              }}
            >
              <Text>Close</Text>
            </Pressable>
            <Pressable>
              <Text>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "flex-start",
    alignItems: "center",
    top: 0,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  input: {
    marginTop: 15,
    backgroundColor: "rgba(192,192,192,0.2)",
    padding: 20,
    borderRadius: 15,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
