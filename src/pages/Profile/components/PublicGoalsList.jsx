import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { COLORS } from "../../../constants/Colors/Colors";
import SkeletonLoading from "../../../components/SkeletonLoading/SkeletonLoading";

import { CertainGoalComponent } from "../../../components/CertainGoalComponent/CertainGoalComponent";
export const PublicGoalsList = ({ token, setScrollY }) => {
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState([]);

  // const [prevScrollY, setPrevScrollY] = useState(0);

  async function getPublicGoals() {
    setLoading(true);

    try {
      const response = await axios.get(`/api/goals`, {
        headers: { Authorization: `bearer ${token}` },
      });

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
  // const handleScroll = (event) => {
  //   const currentScrollY = event.nativeEvent.contentOffset.y;
  //   if (currentScrollY > prevScrollY) {
  //     setScrollY("down");
  //   } else if (currentScrollY < prevScrollY) {
  //     setScrollY("up");
  //   }
  //   setPrevScrollY(currentScrollY);
  // };
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
            <CertainGoalComponent
              goalId={item.id}
              token={token}
              inProfile={true}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          indicatorStyle={COLORS.Accent}
          // onScroll={handleScroll}
          // scrollEventThrottle={500}
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
