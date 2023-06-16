import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Keyboard } from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../../../src/constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { Navigation } from "../../../src/components/Navigation/Navigation";
import axios from "axios";
import { tokenStore } from "../../../store";
import { FONTS } from "../../constants/FONTS/FONTS";
import { CertainGoalComponent } from "../../components/CertainGoalComponent/CertainGoalComponent";
import { NewsTapeGoalComponent } from "./Components/NewsTapeGoalComponent";
export const NewsTape = ({ navigation }) => {
  const [listOfAllGoals, setListOfAllGoals] = useState(null);
  const token = tokenStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const getListOfAllGoals = useCallback(async function getListOfAllGoals() {
    setLoading(true);

    try {
      const response = await axios.get(
        `/api/goals/public`,

        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setListOfAllGoals(response.data.data);

      return response.data.data;
    } catch (error) {
      console.log(`Не получилось получить список всех целей`, error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    getListOfAllGoals();
  }, []);
  function handleRefresh() {
    getListOfAllGoals();
  }
  return (
    <View
      style={{
        backgroundColor: COLORS.Background,
        flex: 1,
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <ScrollView
        contentContainerStyle={[styles.content, { gap: 20, paddingBottom: 20 }]}
        showsVerticalScrollIndicator={true}
        indicatorStyle={COLORS.Accent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={[COLORS.Accent]}
          />
        }
      >
        <Text
          style={[GlobalStyles.pageTitle, { marginLeft: 20, paddingTop: 32 }]}
        >
          Лента
        </Text>
        {listOfAllGoals ? (
          listOfAllGoals.map((e) => {
            return (
              <NewsTapeGoalComponent
                navigation={navigation}
                goalId={e.id}
                key={e.id}
                inserted_at={e.inserted_at}
                deadline={e.deadline}
                title={e.title}
                userId={e.user_id}
                unwrap={true}
                isPublic={e.is_public}
                isJoined={e.is_joined}
                isDone={e.done}
              />
            );
          })
        ) : (
          <Text
            style={{
              ...FONTS.goalTime,
              color: COLORS.Accent,
              flex: 1,
              marginLeft: 20,
            }}
          >
            Ничего нет
          </Text>
        )}
      </ScrollView>

      <Navigation
        navigation={navigation}
        handleRefresh={() => {}}
        setLoading={setLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    // flexGrow: 1,
    // justifyContent: "flex-end",
  },
});
