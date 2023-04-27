import React, { useEffect, useState } from "react";
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

export const MyGoals = ({ navigation }) => {
  const [Loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [goals, setGoals] = useState([]);
  const token = tokenStore((state) => state.token);
  const [refreshing, setRefreshing] = useState(false);
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
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }
  useEffect(() => {
    getGoals();
  }, []);
  return (
    <View
      style={{
        paddingTop: Platform.OS === "ios" ? 0 : 28,
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

      {goals.length === 0 ? (
        <View style={{ flex: 1 }}></View>
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

      <Navigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  postButton: {
    backgroundColor: COLORS.Accent,
    marginTop: 10,
    lineHeight: 16,
    textAlign: "center",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    marginBottom: 29,
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});
