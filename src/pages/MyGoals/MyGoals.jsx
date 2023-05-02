import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { FONTS } from "../../constants/FONTS/FONTS";
import { Goal } from "./components/Goal.jsx";
import axios from "axios";
import { tokenStore } from "../../../store.js";
import { FlatList } from "react-native";
import { Navigation } from "../../components/Navigation/Navigation";
import SkeletonLoading from "../../components/SkeletonLoading/SkeletonLoading";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

export const MyGoals = ({ navigation }) => {
  const [Loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [goals, setGoals] = useState([]);
  const token = tokenStore((state) => state.token);

  useFocusEffect(
    //Этаа функция для обновления списка после удалкения цели
    useCallback(() => {
      handleRefresh();
    }, [])
  );

  const handleRefresh = () => {
    getGoals();
  };
  async function getGoals() {
    setLoading(true);

    try {
      const response = await axios.get(`/api/goals`, {
        headers: { Authorization: `bearer ${token}` },
      });
      const sortedData = response.data.data.sort(
        (a, b) => new Date(b.deadline) - new Date(a.deadline)
      );

      setGoals(sortedData);

      return response.data.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setErrorState(error.response.status);
      } else {
        console.log("NO RESPONSE");
      }
      throw new Error("Ошибка в получении целей");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getGoals();
  }, []);
  return (
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
          Мои цели
        </Text>
        <Image
          source={require("../../../assets/icons/bell-01.png")}
          style={{ width: 24, height: 24 }}
        />
      </View>
      {goals.length === 0 && Loading ? (
        <ScrollView>
          <SkeletonLoading
            width="100%"
            height={120}
            borderRadius={20}
            marginBottom={10}
            repeat={4}
          />
        </ScrollView>
      ) : goals.length === 0 && !Loading ? (
        <Text
          style={{
            ...FONTS.goalTime,
            color: COLORS.Accent,
            flex: 1,
            marginLeft: 20,
          }}
        >
          Нет целей
        </Text>
      ) : (
        <FlatList
          data={goals}
          renderItem={({ item }) => (
            <Goal
              title={item.title}
              id={item.id}
              user_id={item.user_id}
              deadline={item.deadline}
              navigation={navigation}
              startDate={item.inserted_at}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          indicatorStyle={COLORS.Accent}
          refreshControl={
            <RefreshControl
              refreshing={Loading}
              onRefresh={handleRefresh}
              colors={[COLORS.Accent]}
            />
          }
        />
      )}

      <Navigation
        navigation={navigation}
        setLoading={setLoading}
        handleRefresh={handleRefresh}
      />
    </View>
  );
};
