import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { Portal, Dialog } from "react-native-paper";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { Platform } from "react-native";
import { COLORS } from "../../../constants/Colors/Colors";
export const CalendarComponent = ({
  selected,
  setSelected,
  setIsVisibleCalendar,
}) => {
  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    const formattedToday = year + "-" + month + "-" + day;
    return formattedToday;
  }

  function formatDate(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    if (inputDate < currentDate) {
      return "Это прошедшая\nдата";
    }
    const inputYear = inputDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const formattedDate = new Intl.DateTimeFormat("ru", {
      day: "numeric",
      month: "long",
    }).format(inputDate);
    if (inputYear - currentYear >= 1) {
      const date = dateString.replace(/-/g, ".");
      return date.split(".").reverse().join(".");
    }
    return formattedDate;
  }

  return (
    <Portal>
      <View
        style={{
          marginTop: 30,
          position: "absolute",
          bottom: 0,

          width: "100%",
        }}
      >
        <Calendar
          onDayPress={(day) => {
            const date = formatDate(day.dateString);
            setSelected(date);
            setIsVisibleCalendar(false);
          }}
          style={{ backgroundColor: COLORS.LowAccent }}
          current={getFormattedDate()}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
      </View>
    </Portal>
  );
};
