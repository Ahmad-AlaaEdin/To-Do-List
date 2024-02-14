import { View, Text, Dimensions, StyleSheet, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Pie from "../components/Pie";
import { getCompleted, getPending, getCategory } from "../database";
export default function Mine({ navigation }) {
  const [completed, setCompleted] = useState();
  const [pending, setPending] = useState([]);
  const [category, setCategory] = useState([]);
  const refreshData = () => {
    getCompleted()
      .then((data) => {
        setCompleted(data);
      })
      .catch((e) => {
        console.log(e);
      });
    getPending()
      .then((data) => {
        setPending(data);
      })
      .catch((e) => {
        console.log(e);
      });
    getCategory()
      .then((data) => {
        setCategory(data);
        console.log(data);
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
  }, []);
  useEffect(() => {
    console.log(pending);
    console.log(completed);
  }, [pending]);
  const colors = { "No Category": "", "": "" };
  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tasks Overview</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.card}>
          <Text
            onPress={() => {
              refreshData();
              console.log(completed);
            }}
            style={styles.number}
          >
            {completed}
          </Text>
          <Text style={styles.text}>Completed Tasks</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.number}>{pending}</Text>
          <Text style={styles.text}>Pending Tasks</Text>
        </View>
      </View>

      <Pie values={category} total={pending} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "#EBF5FE",
    padding: 20,
    width: "48%",
    textAlign: "center",
    borderRadius: 20,
  },
  text: {
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#6B7076",
  },
  number: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    padding: 10,
    fontFamily: "",
  },
});
