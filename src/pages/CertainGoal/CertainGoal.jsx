import React, { useState } from "react";

import { Text, View } from "react-native";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { tokenStore, userInformationStore } from "../../../store";
import axios from "axios";
import { Navigation } from "../../components/Navigation/Navigation";

import { Button, Dialog, IconButton, Portal } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { CertainGoalComponent } from "../../components/CertainGoalComponent/CertainGoalComponent";
import { FONTS } from "../../constants/FONTS/FONTS";

export const CertainGoal = ({ navigation }) => {
  const token = tokenStore((state) => state.token);
  const [isDone, setIsDone] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const route = useRoute();

  const goalId = route.params.goalId;
  const setGoalIsDone = async (goalId, doneStatus) => {
    try {
      const response = await axios.put(
        `/api/goals/${goalId}`,
        {
          goal: {
            done: doneStatus,
          },
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      setIsDone(true);
      return response;
    } catch (error) {
      console.log("Ошибка в отправке формы", error.response.data.errors);

      // throw new Error("Ошибка в отправке формы");
    }
  };
  const yourId = userInformationStore((state) => state.userInformation.id);
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
                labelStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
              >
                <Text style={{ ...FONTS.postButtonText, color: COLORS.Accent }}>
                  Удалить цель
                </Text>
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
      <View
        style={{
          paddingTop: 32,
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

          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            {!isDone && (
              <Button
                style={{
                  backgroundColor: COLORS.Accent,
                  borderRadius: 20,
                  // paddingHorizontal: 10,
                  // paddingVertical: 3
                }}
                onPress={() => {
                  setGoalIsDone(goalId, true);
                }}
                labelStyle={{ paddingHorizontal: 10 }}
              >
                <Text
                  style={{
                    color: "white",
                    ...FONTS.buttonText,
                  }}
                >
                  Я достиг!
                </Text>
              </Button>
            )}
            <IconButton
              mode="contained"
              onPress={() => setModalIsVisible(true)}
              size={24}
              icon={require("../../../assets/icons/dots-vertical.png")}
              style={[{ backgroundColor: "transparent" }]}
              iconColor={COLORS.Accent}
            />
          </View>
        </View>

        {goalId && (
          <CertainGoalComponent
            goalId={goalId}
            token={token}
            setIsDone={setIsDone}
            userId={yourId}
            navigation={navigation}
            isDone={isDone}
          />
        )}
      </View>
      <Navigation navigation={navigation} handleRefresh={() => {}} />
    </>
  );
};
