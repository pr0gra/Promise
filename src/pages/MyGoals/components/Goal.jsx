import React, { useCallback, useMemo, memo, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import axios from "axios";
import { goalStore, tokenStore } from "../../../../store";
import { TouchableWithoutFeedback } from "react-native";

export const Goal = ({
  title,
  id,
  user_id,
  deadline,
  navigation,
  startDate,
}) => {
  const setGoalId = goalStore((state) => state.setGoalId);
  const goalId = goalStore((state) => state.goalId);
  console.log(startDate);
  const colors = {
    1: "rgba(153, 204, 145, 1)",
    2: "rgba(203, 204, 145, 1)",
    3: "rgba(204, 145, 145, 1)",
  };

  function calculateDaysProgress(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (currentDate < start) {
      return 0;
    }
    if (currentDate > end) {
      return 100;
    }
    const totalDays = Math.round(Math.abs((end - start) / oneDay));
    const daysLeft = Math.round(Math.abs((end - currentDate) / oneDay));
    const progress = Math.round(((totalDays - daysLeft) / totalDays) * 100);
    return progress;
  }

  const start = startDate.split("T")[0];
  const end = deadline.split("T")[0];
  const progress = calculateDaysProgress(start, end);

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
        let result;
        if (Number(day) < 10) {
          result = `${day[1]} ${monthName}`;
        } else {
          result = `${day} ${monthName}`;
        }
        const color = colors[1];
        return { result, color };
      },
    [deadline]
  );
  const { result, color } = formattedDeadline(deadline);
  return (
    <>
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
            <View
              style={{
                backgroundColor:
                  progress < 20
                    ? colors[1]
                    : progress < 50
                    ? colors[2]
                    : colors[3],

                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                marginLeft: 10,
              }}
            >
              <Image
                source={require("../../../../assets/icons/whiteClock.png")}
                style={styles.image}
              />
              <Text style={{ ...FONTS.goalTime, color: COLORS.White }}>
                {result}
              </Text>
            </View>
          </View>
          <Text
            style={{ ...FONTS.goalTime, color: "rgba(145, 155, 204, 0.5)" }}
          >
            {title}
          </Text>
          {/* <Button //это для того чтобы удалить цель, это временно, мне нуэно было протестить refreshing
            onPress={async () => {
              const response = await axios.delete(`/api/goals/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
            }}
          >
            <Text> удалить таск</Text>
          </Button> */}
        </View>
      </TouchableWithoutFeedback>
    </>
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
    // marginLeft: 12,
  },
});
