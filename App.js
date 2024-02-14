import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tasks from "./screens/Tasks";
import CalendarScreen from "./screens/CalendarScreen";
import Mine from "./screens/Mine";
import { useState, useEffect } from "react";
import { PaperProvider, Portal } from "react-native-paper";
import { createTable } from "./database";
const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    createTable();
  }, []);
  return (
    <PaperProvider>
      <Portal>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen
              name="Tasks"
              component={Tasks}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="reader"
                    size={25}
                    color={focused ? "#4584ED" : "#C4CBD1"}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="calendar-clear"
                    size={25}
                    color={focused ? "#4584ED" : "#C4CBD1"}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Mine"
              component={Mine}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="person"
                    size={25}
                    color={focused ? "#4584ED" : "#C4CBD1"}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Portal>
    </PaperProvider>
  );
}
