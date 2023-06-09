import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { goalJoins } from "../../../../../store";
import { tokenStore } from "../../../../../store";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { COLORS } from "../../../../constants/Colors/Colors";
import { UserButtonComponent } from "./components/UserButtonComponent";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContext } from "../../../../../NavigationContext";

export const ListOfJoinsOfGoal = memo(({ isVisible, navigation }) => {
  // const goalId = goalJoins((state) => state.goalId);
  const token = tokenStore((state) => state.token);
  const [joinsArray, setJoinsArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isShowJoins, goalIdState } = useContext(NavigationContext);

  async function getJoins() {
    setLoading(true);

    if (isShowJoins) {
      try {
        const response = await axios.get(`/api/goals/${goalIdState}/joins`, {
          headers: { Authorization: `bearer ${token}` },
        });

        setJoinsArray(response.data.data);
      } catch (error) {
        console.log("Ошибка в получении присоединившихся", error.response);
        return;
        // throw new Error("Ошибка в получении пользователя");
      } finally {
        setLoading(false);
      }
    } else return;
  }
  useEffect(() => {
    if (isShowJoins) {
      getJoins();
    } else return;
  }, [goalIdState, isShowJoins]);

  return (
    <>
      <LinearGradient
        colors={["rgba(0,0, 0, 0)", "#E6EAFE"]}
        start={{
          x: 1,
          y: 1,
        }}
        end={{
          x: 1,
          y: 0,
        }}
        style={{ height: 10, marginBottom: -10, zIndex: 100 }}
      ></LinearGradient>

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
    </>
  );
});

const styles = StyleSheet.create({});
