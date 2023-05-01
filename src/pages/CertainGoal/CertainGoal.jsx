import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Image, View } from "react-native";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { goalStore, tokenStore } from "../../../store";
import axios from "axios";
import { Navigation } from "../../components/Navigation/Navigation";
import UserAvatar from "react-native-user-avatar";
import { formatDate } from "../../constants/Functions/formatDate";
import { PostsArray } from "./components/PostsArray";
import { AddingPostInput } from "./components/AddingPostInput";
import { KeyboardAvoidingView } from "react-native";
import { SkeletonLoaderPosts } from "./components/SkeletonLoaderPosts";

export const CertainGoal = ({ navigation }) => {
  const token = tokenStore((state) => state.token);
  const goalId = goalStore((state) => state.goalId);

  const [Loading, setLoading] = useState(true);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const goalInsertedAt = currentGoal && formatDate(currentGoal.inserted_at);
  const fullName = userInfo?.first_name + " " + userInfo?.last_name;

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

      await setUserInfo(response.data.data);
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
      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 62 : 0,
          backgroundColor: COLORS.Background,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <Text
            style={[
              GlobalStyles.pageTitle,
              { marginLeft: 20, marginTop: 20, marginBottom: 20 },
            ]}
          >
            Цель
          </Text>
          <Image
            source={require("../../../assets/icons/bell-01.png")}
            style={{ width: 24, height: 24 }}
          />
        </View>
        {Loading && !userInfo && !currentGoal ? (
          <SkeletonLoaderPosts />
        ) : (
          <>
            <View style={styles.goalContainer}>
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
                  name={fullName}
                  bgColor={COLORS.Accent}
                />
                <View style={{ gap: 5 }}>
                  <Text>{fullName}</Text>
                  <Text style={{ color: "rgba(175, 175, 175, 1)" }}>
                    {goalInsertedAt}
                  </Text>
                </View>
              </View>
              <View>
                <Text>{currentGoal?.title}</Text>
              </View>
            </View>

            <PostsArray fullName={fullName} goalId={currentGoal?.id} />
          </>
        )}
      </View>
      <Navigation navigation={navigation} />
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
});
