import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import { ButtonReaction } from "./ButtonReaction";
import Rocket from "../../../../assets/icons/Rocket.png";
import Bell from "../../../../assets/icons/bell-01.png";

import usersSquare from "../../../../assets/icons/users-01.png";
import plus from "../../../../assets/icons/plus.png";
import { tokenStore } from "../../../../store";
import axios from "axios";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { NavigationContext } from "../../../../NavigationContext";
export const PostButtons = ({
  goalId,
  deadline,
  isPublic,

  isJoined,
}) => {
  const token = tokenStore((state) => state.token);
  const [isError, setIsError] = useState(false);
  const [isJoinedState, setIsJoinedState] = useState(isJoined);
  const [joinsCounter, setJoinsCounter] = useState(0);

  const { setGoalIdState, setIsShowJoins } = useContext(NavigationContext);
  const joinGoal = useCallback(async function joinGoal() {
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
      setJoinsCounter((state) => state + 1);
      setIsJoinedState(true);

      return response.data.data;
    } catch (error) {
      setIsError(true);

      console.log(
        `Не получилось присоединиться, ошибка ${error.response.data.errors.user_id}`
      );
      setIsJoinedState(true);
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
      setJoinsCounter((state) => state - 1);
      setIsJoinedState(false);
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
  const joinsGoalInfo = useCallback(async function joinsGoalInfo() {
    try {
      const response = await axios.get(
        `/api/goals/${goalId}/joins`,

        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setJoinsCounter(response.data.data.length);

      return response.data.data;
    } catch (error) {
      setIsError(true);

      console.log(
        `Не получилось узнак количество присоединившихся, ошибка ${error.response.data.errors}`
      );
    }
  });
  useEffect(() => {
    joinsGoalInfo();
  }, []);
  function handleShowJoins(goalId) {
    setIsShowJoins(true);
    setGoalIdState(goalId);
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10, flexDirection: "row" }}>
        <ButtonReaction
          image={isJoinedState ? usersSquare : plus}
          onPress={
            isJoinedState ? () => handleShowJoins(goalId) : () => joinGoal()
          }
          text={JSON.stringify(joinsCounter)}
        />

        {isJoinedState && (
          <ButtonReaction
            image={plus}
            onPress={() => deleteGoal()}
            text={"Уйти"}
          />
        )}
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
