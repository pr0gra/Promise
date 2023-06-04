import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";

import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Dialog, Portal } from "react-native-paper";

import { CalendarComponent } from "./CalendarComponent";
import { CreateGoalFormComponent } from "./CreateGoalFormComponent";

// import { Form } from "./Form";

export const CreateGoalComponent = ({
  setIsGoalVisible,
  isGoalVisible,
  noExpand,
  handleRefresh,
  checked,
  setChecked,
  title,
  setTitle,
  selected,
  setSelected,
  errorLengthOfTitle,
  dateError,
}) => {
  const [isVisibleCalendar, setIsVisibleCalendar] = useState(false);

  function formatDate(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    // if (inputDate < currentDate) {
    //   return "Это прошедшая\nдата";
    // }
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

  const windowWidth = Dimensions.get("window").width;
  return (
    <ScrollView>
      <>
        {isVisibleCalendar && (
          <CalendarComponent
            isVisibleCalendar={isVisibleCalendar}
            setIsVisibleCalendar={setIsVisibleCalendar}
            selected={selected}
            setSelected={setSelected}
          />
        )}

        <View style={[styles.top, { width: windowWidth }]}>
          <Text style={{ ...FONTS.goalTime, color: COLORS.Accent }}>
            Хочу к
          </Text>
          <View
            style={{
              backgroundColor: COLORS.LowAccent,
              flexDirection: "row",
              gap: 10,
              borderRadius: 10,
              marginLeft: 10,
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Image
              source={require("../../../../assets/icons/clock.png")}
              style={{ width: 24, height: 24 }}
            />
            <TouchableWithoutFeedback
              onPress={() => setIsVisibleCalendar((state) => !state)}
            >
              <View
                style={{
                  backgroundColor: COLORS.LowAccent,
                  borderRadius: 10,
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    ...FONTS.typography,

                    color: COLORS.Accent,
                    textAlign: "left",
                    marginVertical: "auto",
                    flexDirection: "row",
                    maxWidth: "100%",
                  }}
                >
                  {selected ? formatDate(selected) : "выберите дату"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {dateError && (
          <Text style={{ color: COLORS.Red }}>
            Дата не должна быть прошедшей
          </Text>
        )}
        <CreateGoalFormComponent
          checked={checked}
          setChecked={setChecked}
          title={title}
          setTitle={setTitle}
          errorLengthOfTitle={errorLengthOfTitle}
        />
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LowAccent,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    zIndex: 3,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    // marginLeft: 40,
    marginBottom: 10,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
    // marginLeft: 12,
  },
  box: {
    width: 200,
    height: 200,
  },
  input: {
    backgroundColor: "transparent",
    maxHeight: 100,
    marginBottom: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 36,
  },
  button: {
    backgroundColor: COLORS.Accent,
    marginTop: -17,
    borderRadius: 30,
    // width: 70,
    height: 70,
  },
  surface: {
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 15 },
    // shadowOpacity: 0.15,
    shadowRadius: 4,
    backgroundColor: "transparent",
    flex: 1,
    // height: 70,

    borderRadius: 30,
  },
});
