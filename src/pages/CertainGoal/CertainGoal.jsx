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
import SkeletonLoading from "../../components/SkeletonLoading/SkeletonLoading";
import { Button, Dialog, IconButton, Portal } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
export const CertainGoal = ({ navigation }) => {
  const token = tokenStore((state) => state.token);

  const [Loading, setLoading] = useState(true);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const goalInsertedAt = currentGoal && formatDate(currentGoal.inserted_at);
  const fullName = userInfo?.first_name + " " + userInfo?.last_name;

  const route = useRoute();
  console.log(route);
  const goalId = route.params.goalId; //Саня, тепер id цели получаешь крч не через store а через route, я его запихнул в params когда нажимаешь на цель вот так  navigation.navigate("CertainGoal", { goalId: id }); так что сделашь чтонить с этим

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
      {modalIsVisible && (
        <Portal>
          <Dialog
            visible={modalIsVisible}
            onDismiss={() => {
              setModalIsVisible(false);
            }}
            style={{
              marginRight: 0,

              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <Dialog.Content
              style={{
                paddingHorizontal: 0,
                marginTop: 0,
                paddingBottom: 0,
              }}
            >
              <Button
                onPress={async () => {
                  try {
                    const response = await axios.delete(
                      `/api/goals/${goalId}`,
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );
                    navigation.goBack();
                    return response;
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Text> Удалить цель</Text>
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 62 : 32,
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

          <IconButton
            mode="contained"
            onPress={() => setModalIsVisible(true)}
            size={24}
            icon={require("../../../assets/icons/dots-vertical.png")}
            style={[{ backgroundColor: "transparent" }]}
            iconColor={COLORS.Accent}
          />
        </View>
        {Loading && !userInfo && !currentGoal ? (
          <SkeletonLoading
            padding={20}
            borderRadius={20}
            marginBottom={20}
            width={"100%"}
            height={120}
          />
        ) : (
          <>
            <View style={styles.goalContainer}>
              {fullName !== "undefined undefined" && (
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
                    <Text>
                      {fullName !== "undefined undefined" && fullName}
                    </Text>
                    <Text style={{ color: "rgba(175, 175, 175, 1)" }}>
                      {goalInsertedAt}
                    </Text>
                  </View>
                </View>
              )}
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
    marginBottom: 10,
  },
});
