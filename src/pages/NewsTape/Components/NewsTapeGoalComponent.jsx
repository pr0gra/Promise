import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import UserAvatar from "react-native-user-avatar";
import axios from "axios";
import { tokenStore } from "../../../../store";
import { formatDate } from "../../../constants/Functions/formatDate";
import { PostsArray } from "../../CertainGoal/components/PostsArray";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { UserAvatarButton } from "./UserAvatarButton";
import { PostButtons } from "../../CertainGoal/components/PostButtons";

export const NewsTapeGoalComponent = ({
  navigation,
  inserted_at,
  deadline,
  title,
  userId,
  goalId,
  unwrap = false,
  isPublic,
  isJoined,
  isDone,
}) => {
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const token = tokenStore((state) => state.token);
  const windowWidth = Dimensions.get("window").width;

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
  const formattedDeadline = useCallback(function getDayAndMonth(
    dateTimeString
  ) {
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
  });

  async function getUserInfo() {
    try {
      const response = await axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `bearer ${token}` },
      });

      setUserInfo(response.data.data);
    } catch (error) {
      console.log(
        "Ошибка в получении пользователя",
        error.response.data.errors
      );

      // throw new Error("Ошибка в получении пользователя");
    }
  }
  const fullName = userInfo?.first_name + " " + userInfo?.last_name;
  const goalInsertedAt = formatDate(inserted_at);

  useEffect(() => {
    getUserInfo();
    const progress = getPercentage(inserted_at, deadline);
    setProgress(progress);
    const result = formattedDeadline(deadline);
    setResult(result);
  }, []);
  return (
    <View style={{ marginBottom: -20 }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <UserAvatarButton
            id={userId}
            navigation={navigation}
            fullName={fullName}
          />

          <View
            style={{
              gap: 5,
              flexDirection: "row",
              flexWrap: "wrap",

              maxWidth: windowWidth - 80,
            }}
          >
            <Text
              style={[
                {
                  color: "rgba(175, 175, 175, 1)",
                  ...FONTS.postSubheader,
                },
              ]}
            >
              {fullName !== "undefined undefined" && fullName}
            </Text>
            <Text
              style={{
                color: "rgba(175, 175, 175, 1)",
                ...FONTS.postSubheader,
              }}
            >
              •
            </Text>
            <Text
              style={{
                color: "rgba(175, 175, 175, 1)",
                ...FONTS.postSubheader,
              }}
            >
              {goalInsertedAt}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
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
              style={{ width: 24, height: 24, marginRight: 12 }}
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
          style={{
            ...FONTS.goalTime,
            color: "rgba(145, 155, 204, 0.5)",
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <PostButtons
            goalId={goalId}
            deadline={deadline}
            isPublic={isPublic}
            isJoined={isJoined}
            navigation={navigation}
          />
          {isDone && (
            <Text
              style={{
                color: COLORS.Accent,
                ...FONTS.goalTime,
                textAlign: "right",
              }}
            >
              Я достиг!
            </Text>
          )}
        </View>
      </View>
      <PostsArray
        fullName={fullName}
        goalId={goalId}
        unwrap={unwrap}
        userId={userId}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,

    backgroundColor: COLORS.White,
    borderRadius: 20,
    zIndex: 0,
    elevation: 0,
  },
});
