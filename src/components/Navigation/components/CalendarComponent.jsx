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
  isVisibleCalendar,
}) => {
  function getFormattedDate(tomorrow = 0) {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate() + tomorrow;

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    const formattedToday = year + "-" + month + "-" + day;
    return formattedToday;
  }

  return (
    <Portal>
      <Dialog
        visible={isVisibleCalendar}
        onDismiss={() => {
          setIsVisibleCalendar(false);
        }}
      >
        <Dialog.Content
          style={{
            paddingHorizontal: 0,
            marginTop: 0,
            paddingBottom: 0,
            top: 0,
          }}
        >
          <View
            style={{
              marginTop: 30,
              position: "absolute",
              top: 0,

              width: "100%",
            }}
          >
            <Calendar
              onDayPress={(day) => {
                setSelected(day.dateString);
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
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
