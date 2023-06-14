import React, { useCallback, useMemo, memo, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import axios from "axios";
import { goalStore, tokenStore } from "../../../../store";
import { TouchableWithoutFeedback } from "react-native";
import { useRoute } from "@react-navigation/native";
export const Goal = ({
  title,
  id,
  user_id,
  deadline,
  navigation,
  startDate,
}) => {
  // const setGoalId = goalStore((state) => state.setGoalId);
  // const goalId = goalStore((state) => state.goalId);
  // const token = tokenStore((state) => state.token);
  // const route = useRoute();

  const colors = {
    1: "rgba(153, 204, 145, 1)",
    2: "rgba(203, 204, 145, 1)",
    3: "rgba(204, 145, 145, 1)",
    4: "transparent",
  };

  function getPercentage(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // Количество миллисекунд в одном дне
    const today = new Date(); // Сегодняшняя дата

    // Преобразование дат из строкового формата в формат даты
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Вычисление разницы в днях между сегодняшней датой и датой окончания
    const diffDays = Math.round(Math.abs((today - end) / oneDay));

    // Вычисление процента оставшегося времени
    const percentage = Math.max(
      0,
      Math.min(100, Math.round((diffDays / 100) * 100))
    );

    return percentage;
  }
  const progress = getPercentage(startDate, deadline);

  const formattedDeadline = useMemo(
    () =>
      function getDayAndMonth(dateTimeString) {
        const [date, time] = dateTimeString.split("T");
        const [year, month, day] = date.split("-");
        // const { color } = calculateDaysAndPercentage(startDate, date);

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
        const fullData = [year, month, day].join("-");
        const newDate = new Date();
        const currentYear = newDate.getFullYear();
        if (year - currentYear >= 1) {
          const date = fullData.replace(/-/g, ".");
          return date.split(".").reverse().join(".");
        }
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
  const result = formattedDeadline(deadline);

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          // if (goalId !== id) {
          //   // setGoalId(id);

          // }
          navigation.navigate("CertainGoal", { goalId: id });
        }}
      >
        <View style={styles.goalContainer}>
          <View style={styles.top}>
            <Text style={{ ...FONTS.goalTime, color: COLORS.Accent }}>
              Хочу к
            </Text>
            <View
              style={{
                backgroundColor:
                  progress > 70
                    ? colors[1]
                    : progress > 25
                    ? colors[2]
                    : progress > 0
                    ? colors[3]
                    : colors[4],

                flexDirection: "row",
                alignItems: "center",

                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                marginLeft: 10,
              }}
            >
              <Image
                source={
                  progress > 0
                    ? require("../../../../assets/icons/whiteClock.png")
                    : require("../../../../assets/icons/clock.png")
                }
                style={styles.image}
              />
              <Text
                style={{
                  ...FONTS.goalTime,
                  color: progress > 0 ? COLORS.White : COLORS.Accent,
                }}
              >
                {result}
              </Text>
            </View>
          </View>
          <Text
            style={{ ...FONTS.goalTime, color: "rgba(145, 155, 204, 0.5)" }}
          >
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: COLORS.White,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 12,
    // marginLeft: 12,
  },
});
