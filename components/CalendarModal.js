import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {Calendar} from 'react-native-calendars';

const CalendarModal = () => {
  
  return (
    <Calendar
    style={{
      borderRadius:20
    }}
    onDayPress={()=>{

    }}
    />
  );
};

export default CalendarModal;

const styles = StyleSheet.create({});
