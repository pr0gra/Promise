import React, { useCallback, useMemo, memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import axios from "axios";
import { goalStore } from "../../../../store";
import { TouchableWithoutFeedback } from "react-native";

export const Goal = ({ title, id, user_id, deadline, navigation }) => {
  const setGoalId = goalStore((state) => state.setGoalId);
  const goalId = goalStore((state) => state.goalId);

  const formattedDeadline = useMemo(
    () =>
      function getDayAndMonth(dateTimeString) {
        const [date, time] = dateTimeString.split("T");
        const [year, month, day] = date.split("-");
        const monthNames = [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
        ];
        const monthName = monthNames[parseInt(month) - 1];
        let result;
        if (Number(day) < 10) {
          result = `${day[1]} ${monthName}`;
        } else {
          result = `${day} ${monthName}`;
        }

        return result;
      },
    [deadline]
  );
  console.log(goalId);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (goalId !== id) {
          setGoalId(id);
          navigation.navigate("CertainGoal");
        } else {
          return null;
        }
      }}
    >
      <View style={styles.goalContainer}>
        <View style={styles.top}>
          <Text style={{ ...FONTS.goalTime, color: COLORS.Accent }}>
            Хочу к
          </Text>
          <Image
            source={require("../../../../assets/icons/clock.png")}
            style={styles.image}
          />
          <Text style={{ ...FONTS.goalTime, color: COLORS.Accent }}>
            {formattedDeadline(deadline)}
          </Text>
        </View>
        <Text style={{ ...FONTS.goalTime, color: "rgba(145, 155, 204, 0.5)" }}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    padding: 20,
    backgroundColor: COLORS.White,
    borderRadius: 20,
    marginBottom: 20,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 12,
    marginLeft: 12,
  },
});
