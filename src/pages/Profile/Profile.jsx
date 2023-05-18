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

import { Button, IconButton } from "react-native-paper";

export const Profile = ({ navigation }) => {
  const token = tokenStore((state) => state.token);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState([]);

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
    console.log("refresh");
  };
  useEffect(() => {
    getUserInfo();
    getPublicGoals();
  }, []);

  const scrollY = new Animated.Value(0);
  const diffClampBigHeader = Animated.diffClamp(scrollY, 0, 300);
  const translateYBigHeader = diffClampBigHeader.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });

  const heightSize = useRef(new Animated.Value(0)).current;
  const expandMiniHeader = () => {
    Animated.timing(heightSize, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const noExpandMiniHeader = () => {
    Animated.timing(heightSize, {
      toValue: -100,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    translateYBigHeader.addListener(({ value }) => {
      if (value < -190) {
        expandMiniHeader();
      } else {
        noExpandMiniHeader();
      }
    });
  }, [translateYBigHeader]);
  const handleScroll = (event) => {
    const contentOffset = event.contentOffset;
    const layoutMeasurement = event.layoutMeasurement;
    const contentSize = event.contentSize;
    const isScrolledToEnd =
      contentOffset.y >= contentSize.height - layoutMeasurement.height;
    if (isScrolledToEnd && Platform.OS === "ios") {
      event.preventDefault(); // prevent further scroll
    }
  };
  return (
    <>
      <View style={[styles.container]}>
        <Animated.View
          style={{
            transform: [{ translateY: translateYBigHeader }],
            zIndex: 10,
          }}
        >
          <View
            style={{
              position: "absolute",
              paddingBottom: 20,
              right: 0,
              left: 0,
              paddingTop: Platform.OS === "ios" ? 64 : 32,
              marginTop: Platform.OS === "ios" ? -64 : -32,
              backgroundColor: COLORS.Background,
            }}
          >
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
              <Text
                style={[styles.name]}
              >{`${userData?.first_name} ${userData?.last_name}`}</Text>
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

            <InteractionButtons />
          </View>
        </Animated.View>

        <Animated.View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            transform: [{ translateY: heightSize }],
            zIndex: 4,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.Background,
            gap: 20,
          }}
        >
          <IconButton
            mode="contained"
            onPress={() => navigation.goBack()}
            size={24}
            icon={require("../../../assets/icons/arrow-narrow-left.png")}
            style={{ backgroundColor: "transparent", borderRadius: 20 }}
            iconColor={COLORS.Accent}
            zIndex={150}
          />
          {userData?.first_name && userData?.last_name ? (
            <Text
              style={[styles.name, { marginTop: 0 }]}
            >{`${userData?.first_name} ${userData?.last_name}`}</Text>
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
          <IconButton
            mode="contained"
            onPress={() => console.log("...")}
            size={24}
            icon={require("../../../assets/icons/dots-vertical.png")}
            style={{ backgroundColor: "transparent", borderRadius: 20 }}
            iconColor={COLORS.Accent}
          />
        </Animated.View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 189,
          }}
          showsVerticalScrollIndicator={true}
          indicatorStyle={COLORS.Accent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              colors={[COLORS.Accent]}
            />
          }
          scrollEventThrottle={16}
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y); //отсюда берутся коорды при скролле
            handleScroll(e.nativeEvent);
          }}
          style={{ zIndex: 1 }}
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
                    key={e.id}
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

      <Navigation navigation={navigation} handleRefresh={handleRefresh} />
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
