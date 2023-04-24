import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Image, View } from "react-native";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { goalStore, tokenStore } from "../../../store";
import axios from "axios";
import { Navigation } from "../../components/Navigation/Navigation";

export const CertainGoal = () => {
  const goalId = goalStore((state) => state.goalId);
  const [Loading, setLoading] = useState(false);
  const token = tokenStore((state) => state.token);
  const [currentGoal, setCurrentGoal] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  async function getGoalById(goalId, token) {
    setLoading(true);
    try {
      const response = await axios.get(`/api/goals/${goalId}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      await setCurrentGoal(response.data.data)
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log("NO RESPONSE");
      }
      throw new Error("Ошибка в получении цели");
    } finally {
      setLoading(false)
    }
  }


  async function getUserInfo(goalId, token) {
    setLoading(true);
    try {
      const response = await axios.get(`/api/users/${goalId}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      
      await setUserInfo(response.data.data)
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log("NO RESPONSE");
      }
      throw new Error("Ошибка в получении пользователя");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getGoalById(goalId, token);
    getUserInfo(currentGoal.user_id, token)
  }, []);
  
  
  return (
   <>
   <View  style={{
      paddingTop: Platform.OS === "ios" ? 28 : 0,
      backgroundColor: COLORS.Background,
      flex: 1,
    }}>
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

      <View style={styles.goalContainer} >
          <View>
            <Image />
            <View>
              <Text></Text>
              <Text></Text>
            </View>
          </View>
          <View>
            <Text>{currentGoal && currentGoal.title}</Text>
          </View>
      </View>

      
    </View>
    <Navigation />
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