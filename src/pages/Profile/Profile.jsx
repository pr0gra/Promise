import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../constants/Colors/Colors";
import { ProfileImageContainer } from "./components/ProfileImageContainer";
import { InteractionButtons } from "./components/InteractionButtons";
import { FONTS } from "../../../src/constants/FONTS/FONTS";

import { Navigation } from "../../../src/components/Navigation/Navigation";
import axios from "axios";
import { tokenStore } from "../../../store";
import SkeletonLoading from "../../components/SkeletonLoading/SkeletonLoading";

import { CertainGoalComponent } from "../../components/CertainGoalComponent/CertainGoalComponent";
import { HideSmoothlyComponent } from "../../components/HideSmoothlyComponent/HideSmoothlyComponent";

export const Profile = ({ navigation }) => {
  const token = tokenStore((state) => state.token);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState([]);

  const scrollY = new Animated.Value(0);
  async function getUserInfo() {
    setLoading(true);
    try {
      const response = await axios.get("/api/profile", {
        headers: { Authorization: `bearer ${token}` },
      });

      setUserData(response.data.data);

      return response.data.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
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

  const handleRefresh = () => {
    getPublicGoals();
  };
  useEffect(() => {
    getUserInfo();
    getPublicGoals();
  }, []);
  const diffClamp = Animated.diffClamp(scrollY, 0, 150);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
  });
  const diffClampName = Animated.diffClamp(scrollY, 0, 15);
  const translateYName = diffClampName.interpolate({
    inputRange: [0, 15],
    outputRange: [0, 50],
  });

  return (
    <>
      <View style={[styles.container]}>
        <HideSmoothlyComponent scrollY={scrollY} height={160}>
          <>
            {userData?.first_name && userData?.last_name ? (
              <ProfileImageContainer
                navigation={navigation}
                firstName={userData?.first_name}
                lastName={userData?.last_name}
                scrollY={scrollY}
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <SkeletonLoading width={100} height={100} borderRadius={100} />
              </View>
            )}
            {userData?.first_name && userData?.last_name ? (
              <Animated.View
                style={{
                  transform: [{ translateY: translateYName }],
                }}
              >
                <Text
                  style={[styles.name]}
                >{`${userData?.first_name} ${userData?.last_name}`}</Text>
              </Animated.View>
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <SkeletonLoading
                  width={200}
                  height={25}
                  borderRadius={20}
                  marginTop={20}
                />
              </View>
            )}
            <Animated.View style={{ transform: [{ translateY: translateY }] }}>
              <InteractionButtons />
            </Animated.View>
          </>
        </HideSmoothlyComponent>
        <ScrollView
          contentContainerStyle={{ flexGrow: 0, paddingTop: 240 }}
          showsVerticalScrollIndicator={true}
          indicatorStyle={COLORS.Accent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              colors={[COLORS.Accent]}
            />
          }
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
        >
          <>
            {goals?.length === 0 && loading ? (
              <SkeletonLoading
                width="100%"
                height={120}
                borderRadius={20}
                marginBottom={10}
                repeat={4}
              />
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
              goals?.map((e) => {
                return (
                  <CertainGoalComponent
                    goalId={e.id}
                    token={token}
                    unwrap={true}
                  />
                );
              })
            )}
          </>
        </ScrollView>
      </View>

      <Navigation navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 64 : 32,
    backgroundColor: COLORS.Background,
    flex: 1,
  },
  name: {
    textAlign: "center",
    marginTop: 20,
    ...FONTS.smallerSectionHeader,
    color: COLORS.Accent,
  },
});
