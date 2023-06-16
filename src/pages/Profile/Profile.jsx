import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
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
import { ProfileModalContainer } from "./components/ProfileModalContainer";
import { useRoute } from "@react-navigation/native";
import { userInformationStore } from "../../../store";
export const Profile = ({ navigation }) => {
  const token = tokenStore((state) => state.token);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setModalIsVisible] = useState(false);
  const route = useRoute();

  const userId = route.params.id;
  const [isSubscribed, setIsSubscribed] = useState(false);
  const userInformation = userInformationStore(
    (state) => state.userInformation
  );
  async function getUserInfo() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `bearer ${token}` },
      });

      setUserData(response.data.data);

      return response.data.data;
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }
  async function getPublicGoals() {
    setLoading(true);

    try {
      const response = await axios.get(`/api/users/${userId}/goals`, {
        headers: { Authorization: `bearer ${token}` },
      });

      const filtered = response.data.data.filter((e) => {
        if (e.is_public === true) return true;
      });
      setGoals(filtered);

      return response.data.data;
    } catch (error) {
      console.log(error);

      // throw new Error("Ошибка в получении целей");
    } finally {
      setLoading(false);
    }
  }

  const handleRefresh = () => {
    getPublicGoals();
    getUserInfo();
    console.log("refresh");
  };

  useEffect(() => {
    getUserInfo();
    getPublicGoals();

    noExpandMiniHeader();
  }, [userId]);

  const scrollY = new Animated.Value(0);

  const heightSize = useRef(new Animated.Value(0)).current;
  const expandMiniHeader = () => {
    Animated.timing(heightSize, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const noExpandMiniHeader = () => {
    Animated.timing(heightSize, {
      duration: 300,
      toValue: -300,
      useNativeDriver: true,
    }).start();
  };

  const handleScroll = (event) => {
    if (event.contentOffset.y > 190) {
      expandMiniHeader();
    } else {
      noExpandMiniHeader();
    }
    const contentOffset = event.contentOffset;
    const layoutMeasurement = event.layoutMeasurement;
    const contentSize = event.contentSize;
    const isScrolledToEnd =
      contentOffset.y >= contentSize.height - layoutMeasurement.height;
    if (isScrolledToEnd && Platform.OS === "ios") {
      event.preventDefault();
    }
  };
  async function getSubscribed(id) {
    setLoading(true);

    try {
      const response = await axios.get(`/api/users/${id}/subscription`, {
        headers: { Authorization: `bearer ${token}` },
      });

      response.status === 200 ? setIsSubscribed(true) : setIsSubscribed(false);

      return response.status;
    } catch (error) {
      setIsSubscribed(false);
      console.log(
        "Ошибка в проверке подписки к пользователю",
        error.response.data
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (userInformation.id !== userData?.id) {
      userData?.id && userInformation.id && getSubscribed(userData?.id);
    }
  }, [userData?.id]);
  return (
    <>
      {isModalVisible && (
        <ProfileModalContainer
          isModalVisible={isModalVisible}
          setModalIsVisible={setModalIsVisible}
          navigation={navigation}
        />
      )}
      <View style={[styles.container]}>
        <Animated.View //miniHeader
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingHorizontal: 20,
            paddingTop: 32,
            transform: [{ translateY: heightSize }],
            zIndex: 4,
            alignItems: "center",

            backgroundColor: COLORS.Background,
            gap: 20,
          }}
        >
          <View
            style={{
              flex: 1,
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
          </View>

          <View
            style={{
              flex: 8,
            }}
          >
            {userData?.first_name && userData?.last_name ? (
              <Text
                style={[
                  styles.nameMiniHeader,
                  {
                    marginTop: 0,
                  },
                ]}
              >{`${userData?.first_name} ${userData?.last_name}`}</Text>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SkeletonLoading
                  width={200}
                  height={25}
                  borderRadius={20}
                  marginTop={20}
                />
              </View>
            )}
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            {userInformation.id === userData?.id && (
              <IconButton
                mode="contained"
                onPress={() => setModalIsVisible((state) => !state)}
                size={24}
                icon={require("../../../assets/icons/dots-vertical.png")}
                style={{
                  backgroundColor: "transparent",
                  borderRadius: 20,
                }}
                iconColor={COLORS.Accent}
              />
            )}
          </View>
        </Animated.View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
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
            <Animated.View
              style={{
                paddingTop: 32,
                zIndex: 10,
              }}
            >
              <View
                style={{
                  paddingBottom: 20,
                  paddingTop: 32,
                  marginTop: -32,
                  backgroundColor: COLORS.Background,
                }}
              >
                {userData?.first_name && userData?.last_name ? (
                  <ProfileImageContainer
                    navigation={navigation}
                    firstName={userData?.first_name}
                    lastName={userData?.last_name}
                    scrollY={scrollY}
                    setModalIsVisible={setModalIsVisible}
                    userInformationId={userInformation.id}
                    userDataId={userData?.id}
                  />
                ) : (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <SkeletonLoading
                      width={100}
                      height={100}
                      borderRadius={100}
                    />
                  </View>
                )}
                {userData?.first_name && userData?.last_name ? (
                  <Text
                    style={[styles.name]}
                  >{`${userData?.first_name} ${userData?.last_name}`}</Text>
                ) : (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <SkeletonLoading
                      width={200}
                      height={25}
                      borderRadius={20}
                      marginTop={20}
                    />
                  </View>
                )}

                {userInformation.id !== userData?.id && (
                  <InteractionButtons
                    id={userData?.id}
                    token={token}
                    isSubscribed={isSubscribed}
                    setIsSubscribed={setIsSubscribed}
                    isProfileLoading={loading}
                  />
                )}
              </View>
            </Animated.View>

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
                    userId={e.user_id}
                    token={token}
                    unwrap={true}
                    navigation={navigation}
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
  nameMiniHeader: {
    textAlign: "center",
    marginTop: 20,
    ...FONTS.smallerSectionHeader,
    color: COLORS.Accent,
  },
  name: {
    textAlign: "center",
    marginTop: 20,
    ...FONTS.smallerSectionHeader,
    color: COLORS.Accent,
  },
});
