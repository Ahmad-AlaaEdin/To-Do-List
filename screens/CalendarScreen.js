import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import Task from "../components/Task";
import { selectTasksByDate } from "../database";
import { getDates } from "../database";
export default function CalendarScreen({ navigation }) {
  const d = new Date();
  const day = ("0" + d.getDate()).slice(-2);
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  const [tasks, setTasks] = useState();
  const [dates, setDates] = useState();
  const [selected, setSelected] = useState(`${year}-${month}-${day}`);

  const refreshData = () => {
    selectTasksByDate(selected)
      .then((data) => {
        setTasks(data);
      })
      .catch((e) => {
        console.log(e);
      });
    getDates()
      .then((data) => {
        const updatedDates = {};
        data.forEach((item) => {
          updatedDates[item.date] = { marked: true };
        });

        setDates(updatedDates);
        console.log("1111111111111111111111111111111");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refreshData();
    });

    refreshData();
  }, [selected]);

  return (
    <View style={styles.container}>
      {dates ? (
        <Calendar
          markedDates={dates}
          onDayPress={(date) => {
            setSelected(date.dateString);
          }}
        />
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}

      <View style={{ padding: 10 }}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <Text
              style={{
                padding: 20,
                backgroundColor: "rgba(192,192,192,0.1)",
                borderRadius: 15,
                margin: 5,
              }}
            >
              {item.task}
            </Text>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
});
