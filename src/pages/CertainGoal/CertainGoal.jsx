import React, { useState } from "react";

import { Text, View } from "react-native";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { tokenStore } from "../../../store";
import axios from "axios";
import { Navigation } from "../../components/Navigation/Navigation";

import { Button, Dialog, IconButton, Portal } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { CertainGoalComponent } from "../../components/CertainGoalComponent/CertainGoalComponent";

export const CertainGoal = ({ navigation }) => {
  const token = tokenStore((state) => state.token);

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const route = useRoute();

  const goalId = route.params.goalId;

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
        {goalId && <CertainGoalComponent goalId={goalId} token={token} />}
      </View>
      <Navigation navigation={navigation} />
    </>
  );
};
