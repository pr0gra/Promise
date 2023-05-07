import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import UserAvatar from "react-native-user-avatar";
import { PostsArray } from "../../pages/CertainGoal/components/PostsArray";
import axios from "axios";
import { formatDate } from "../../constants/Functions/formatDate";
import { COLORS } from "../../constants/Colors/Colors";
import SkeletonLoading from "../SkeletonLoading/SkeletonLoading";
import { Button } from "react-native-paper";
import { PostButtons } from "../../pages/CertainGoal/components/PostButtons";
import { FONTS } from "../../constants/FONTS/FONTS";

export const CertainGoalComponent = ({ goalId, token, inProfile = false }) => {
  const [loading, setLoading] = useState(true);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [postsLimit, setPostsLimit] = useState(true);

  const fullName = userInfo?.first_name + " " + userInfo?.last_name;

  const goalInsertedAt = currentGoal && formatDate(currentGoal.inserted_at);
  async function getGoalById(goalId, token) {
    setLoading(true);
    try {
      const response = await axios.get(`/api/goals/${goalId}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      setCurrentGoal(response.data.data);

      getUserInfo(response.data.data.user_id, token);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log("NO RESPONSE");
      }
      throw new Error("Ошибка в получении подпостов к цели");
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
      if (error.response) {
        console.log(error.response);
      } else {
        console.log("NO RESPONSE");
      }
      throw new Error("Ошибка в получении пользователя");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getGoalById(goalId, token);
  }, []);

  return (
    <>
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
            style={[styles.goalContainer, { marginBottom: inProfile ? 0 : 10 }]}
          >
            {fullName !== "undefined undefined" ? (
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <UserAvatar
                  style={{ width: 50 }}
                  size={50}
                  name={fullName !== "undefined undefined" ? fullName : ""}
                  bgColor={COLORS.Accent}
                />
                <View style={{ gap: 5 }}>
                  <Text>{fullName !== "undefined undefined" && fullName}</Text>
                  <Text style={{ color: "rgba(175, 175, 175, 1)" }}>
                    {goalInsertedAt}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
                <SkeletonLoading
                  padding={20}
                  borderRadius={100}
                  height={61}
                  width={61}
                  backgroundColor={COLORS.LowAccent}
                />
                <View
                  style={{
                    flexDirection: "column",
                    gap: 10,

                    justifyContent: "center",
                  }}
                >
                  <SkeletonLoading
                    borderRadius={10}
                    height={10}
                    width={100}
                    backgroundColor={COLORS.LowAccent}
                  />
                  <SkeletonLoading
                    borderRadius={10}
                    height={10}
                    width={100}
                    backgroundColor={COLORS.LowAccent}
                  />
                </View>
              </View>
            )}
            <View>
              <Text>{currentGoal?.title}</Text>
            </View>
            <PostButtons
              goalId={goalId}
              deadline={currentGoal?.deadline}
              isPublic={currentGoal?.is_public}
            />
          </View>
          {inProfile && (
            <View style={styles.buttonContainer}>
              <Button
                style={{ alignItems: "flex-start", marginLeft: 20 }}
                icon={
                  postsLimit
                    ? require("../../../assets/icons/chevron-down.png")
                    : require("../../../assets/icons/chevron-right.png")
                }
                size={24}
                onPress={() => {
                  setPostsLimit((state) => !state);
                }}
                labelStyle={{ color: COLORS.Accent }}
              >
                <Text style={{ color: COLORS.Accent }}>Развернуть</Text>
              </Button>
            </View>
          )}
          <PostsArray
            fullName={fullName}
            goalId={goalId}
            inProfile={inProfile}
            postsLimit={postsLimit}
            setPostsLimit={setPostsLimit}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.White,
    borderRadius: 20,
  },
  buttonContainer: {
    width: "100%",
  },
});
