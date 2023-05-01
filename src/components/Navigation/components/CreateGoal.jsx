import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Dialog, Portal } from "react-native-paper";

import { CalendarComponent } from "./CalendarComponent";

import { Form } from "./Form";

export const CreateGoal = ({
  setIsGoalVisible,
  isGoalVisible,
  noExpand,
  handleRefresh,
}) => {
  const [isVisibleCalendar, setIsVisibleCalendar] = useState(false);
  const [selected, setSelected] = useState("");

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
  return (
    
      <Portal>
        <Dialog
          visible={isGoalVisible}
          onDismiss={() => {
            setIsGoalVisible(false);
            noExpand();
          }}
          style={{
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            position: "absolute",
            bottom: 0,

            width: "100%",
          }}
        >
          <Dialog.Content
            style={{
              paddingHorizontal: 0,
              marginTop: 0,
              paddingBottom: 0,
            }}
          >
            <>
              {isVisibleCalendar && (
                <CalendarComponent
                  isVisibleCalendar={isVisibleCalendar}
                  setIsVisibleCalendar={setIsVisibleCalendar}
                  selected={selected}
                  setSelected={setSelected}
                />
              )}
              <LinearGradient
                colors={["rgba(231, 235, 255, 1)", "rgba(208, 214, 242, 1)"]}
                start={{
                  x: 1,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 1,
                }}
                style={styles.container}
              >
                <View
                  style={{
                    width: 50,
                    height: 4,
                    backgroundColor: COLORS.Accent,
                    left: "50%",
                    marginLeft: -25,
                    borderRadius: 100,
                    marginBottom: 20,
                  }}
                ></View>
                <View style={styles.top}>
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
                          {selected ? formatDate(selected) : "Выберите дату"}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <Form
                  time={selected}
                  setIsGoalVisible={setIsGoalVisible}
                  noExpand={noExpand}
                  handleRefresh={handleRefresh}
                />
              </LinearGradient>
            </>
          </Dialog.Content>
        </Dialog>
      </Portal>
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
