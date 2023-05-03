import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { tokenStore } from "../../../../store";
import axios from "axios";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { COLORS } from "../../../constants/Colors/Colors";
import SkeletonLoading from "../../../components/SkeletonLoading/SkeletonLoading";
import { PublicGoal } from "./PublicGoal";
export const PublicGoalsList = ({ token, firstName, lastName }) => {
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState([]);
  async function getPublicGoals() {
    setLoading(true);

    try {
      const response = await axios.get(
        `/api/goals`,
        {
          headers: { Authorization: `bearer ${token}` },
        }
        // {
        //   params: {
        //     is_public: true,
        //   },
        // }
      );

      const filtered = response.data.data.filter((e) => {
        if (e.is_public === true) return true;
      });
      setGoals(filtered);

      return response.data.data;
    } catch (error) {
      if (error.response) {
      } else {
        console.log("NO RESPONSE");
      }
      throw new Error("Ошибка в получении целей");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getPublicGoals();
  }, []);
  const handleRefresh = () => {
    getPublicGoals();
  };
  return (
    <>
      {goals?.length === 0 && loading ? (
        <ScrollView>
          <SkeletonLoading
            width="100%"
            height={120}
            borderRadius={20}
            marginBottom={10}
            repeat={4}
          />
        </ScrollView>
      ) : goals.length === 0 && !loading ? (
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
            <PublicGoal
              item={item}
              token={token}
              firstName={firstName}
              lastName={lastName}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          indicatorStyle={COLORS.Accent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              colors={[COLORS.Accent]}
            />
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});
