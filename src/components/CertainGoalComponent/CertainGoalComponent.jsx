import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import UserAvatar from "react-native-user-avatar";
import { PostsArray } from "../../pages/CertainGoal/components/PostsArray";
import axios from "axios";
import { formatDate } from "../../constants/Functions/formatDate";
import { COLORS } from "../../constants/Colors/Colors";
import SkeletonLoading from "../SkeletonLoading/SkeletonLoading";
import { Button } from "react-native-paper";
import { PostButtons } from "../../pages/CertainGoal/components/PostButtons";
import { FONTS } from "../../constants/FONTS/FONTS";
import { userInformationStore } from "../../../store";

export const CertainGoalComponent = ({
  goalId,
  token,
  userId,
  unwrap = false,
  setIsDone,
  navigation,
  isDone,
}) => {
  const [loading, setLoading] = useState(true);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const windowWidth = Dimensions.get("window").width;
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState("");

  const fullName = userInfo?.first_name + " " + userInfo?.last_name;
  const goalInsertedAt = currentGoal && formatDate(currentGoal.inserted_at);

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
      return (result = `${day[1]} ${monthName}`);
    } else {
      return (result = `${day} ${monthName}`);
    }

    // return result;
  });

  async function getGoalById(goalId, token) {
    setLoading(true);
    try {
      const response = await axios.get(`/api/goals/${goalId}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      setCurrentGoal(response.data.data);

      setIsDone && setIsDone(response.data.data.done);
      const progress = getPercentage(
        response.data.data.inserted_at,
        response.data.data.deadline
      );
      const result = formattedDeadline(response.data.data.deadline);
      setProgress(progress);
      setResult(result);

      getUserInfo(response.data.data.user_id, token);
    } catch (error) {
      console.log("Ошибка в получении подпостов к цели", error);

      // throw new Error("Ошибка в получении подпостов к цели");
    } finally {
      setLoading(false);
    }
  }

  async function getUserInfo(userId, token) {
    setLoading(true);
    try {
      const response = await axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `bearer ${token}` },
      });

      setUserInfo(response.data.data);
    } catch (error) {
      console.log("Ошибка в получении пользователя", error);

      // throw new Error("Ошибка в получении пользователя");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getGoalById(goalId, token);
  }, [isDone]);

  const colors = {
    1: "rgba(153, 204, 145, 1)",
    2: "rgba(203, 204, 145, 1)",
    3: "rgba(204, 145, 145, 1)",
    4: "transparent",
  };

  return (
    <ScrollView>
      <View key={goalId}>
        {!userInfo && !currentGoal ? (
          <SkeletonLoading
            padding={20}
            borderRadius={20}
            marginBottom={20}
            width={"100%"}
            height={120}
          />
        ) : (
          <>
            <View
              style={[styles.goalContainer, { marginBottom: unwrap ? 0 : 10 }]}
            >
              {fullName !== "undefined undefined" ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 15,
                    // flexWrap: "wrap",
                    // maxWidth: windowWidth - 40 - 20 - 20,
                  }}
                >
                  <UserAvatar
                    style={{ width: 20 }}
                    size={20}
                    name={fullName !== "undefined undefined" ? fullName : ""}
                    bgColor={COLORS.Accent}
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
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <SkeletonLoading
                    borderRadius={100}
                    height={20}
                    width={20}
                    backgroundColor={COLORS.Accent}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                    }}
                  >
                    <SkeletonLoading
                      borderRadius={10}
                      height={10}
                      width={100}
                      backgroundColor={"rgba(175, 175, 175, 1)"}
                    />
                    <SkeletonLoading
                      borderRadius={10}
                      height={10}
                      width={50}
                      backgroundColor={"rgba(175, 175, 175, 1)"}
                    />
                  </View>
                </View>
              )}

              <View>
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
                          ? require("../../../assets/icons/whiteClock.png")
                          : require("../../../assets/icons/clock.png")
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
                  {currentGoal?.title}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <PostButtons
                  goalId={goalId}
                  deadline={currentGoal?.deadline}
                  isPublic={currentGoal?.is_public}
                  isJoined={currentGoal?.is_joined}
                  navigation={navigation}
                />
                {currentGoal?.done && (
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
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,

    backgroundColor: COLORS.White,
    borderRadius: 20,
    zIndex: 0,
    elevation: 0,
  },
  buttonContainer: {
    width: "100%",
  },
});
