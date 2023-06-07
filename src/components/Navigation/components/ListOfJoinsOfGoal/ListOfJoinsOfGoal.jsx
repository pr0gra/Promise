import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { goalJoins } from "../../../../../store";
import { tokenStore } from "../../../../../store";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { COLORS } from "../../../../constants/Colors/Colors";
import { UserButtonComponent } from "./components/UserButtonComponent";
import { LinearGradient } from "expo-linear-gradient";
export const ListOfJoinsOfGoal = memo(({ isVisible, navigation }) => {
  const goalId = goalJoins((state) => state.goalId);
  const token = tokenStore((state) => state.token);
  const [joinsArray, setJoinsArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const getJoins = useCallback(
    async function getJoins() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/goals/${goalId}/joins`, {
          headers: { Authorization: `bearer ${token}` },
        });

        setJoinsArray(response.data.data);
      } catch (error) {
        console.log("Ошибка в получении присоединившихся", error.response);

        // throw new Error("Ошибка в получении пользователя");
      } finally {
        setLoading(false);
      }
    },
    [goalId]
  );
  useEffect(() => {
    isVisible && getJoins();
  }, [goalId]);

  return (
    <ScrollView style={{ maxHeight: 500 }}>
      {joinsArray?.map((e) => {
        return (
          <UserButtonComponent
            key={e.user_id}
            userId={e.user_id}
            token={token}
            navigation={navigation}
            isVisible={isVisible}
          />
        );
      })}
    </ScrollView>
  );
});

const styles = StyleSheet.create({});
