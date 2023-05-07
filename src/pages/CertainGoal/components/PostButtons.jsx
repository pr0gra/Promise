import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Button } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import { ButtonReaction } from "./ButtonReaction";
import Rocket from "../../../../assets/icons/Rocket.png";
import Bell from "../../../../assets/icons/bell-01.png";
import messageSquare from "../../../../assets/icons/message-square-01.png";
import plus from "../../../../assets/icons/plus.png";
import { tokenStore } from "../../../../store";
import axios from "axios";
import { FONTS } from "../../../constants/FONTS/FONTS";
export const PostButtons = ({ goalId, deadline, isPublic }) => {
  const token = tokenStore((state) => state.token);
  const [isError, setIsError] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const joinGoal = useCallback(async function joinGoal() {
    setIsError(false);
    setIsJoined(false);
    try {
      const response = await axios.post(
        `/api/goals/${goalId}/join`,
        {
          join: {
            deadline: deadline,
            is_public: isPublic,
          },
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "AAAAAAAAAAAAAAAA");
      setIsJoined(true);

      return response.data.data;
    } catch (error) {
      setIsError(true);
      setIsJoined(false);
      console.log(
        `Не получилось присоединиться, ошибка ${error.response.data.errors.user_id}`
      );
    } finally {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  });
  const deleteGoal = useCallback(async function deleteGoal() {
    setIsError(false);
    try {
      const response = await axios.delete(
        `/api/goals/${goalId}/join`,

        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log("Ушел");

      return response.data.data;
    } catch (error) {
      setIsError(true);
      console.log(
        `Не получилось присоединиться, ошибка ${error.response.data.errors.user_id}`
      );
    } finally {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  });
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10, flexDirection: "row" }}>
        <ButtonReaction
          image={plus}
          onPress={() => joinGoal()}
          text={"Присоединиться"}
        />
        <ButtonReaction
          image={plus}
          onPress={() => deleteGoal()}
          text={"Уйти"}
        />
      </View>
      {isError && (
        <Text style={{ ...FONTS.postButtonText, color: "red" }}>
          Пользователь уже присоединился
        </Text>
      )}
      {/* <View style={styles.bottomButtonsContainer}>
        <ButtonReaction
          image={Bell}
          onPress={() => console.log("Bell")}
          text={"10"}
        />
        <ButtonReaction
          image={Rocket}
          onPress={() => console.log("Rocket")}
          text={"10"}
        />
        <ButtonReaction
          image={messageSquare}
          onPress={() => console.log("messageSquare")}
          text={"советы"}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  bottomButtonsContainer: { flexDirection: "row", gap: 10 },
});
