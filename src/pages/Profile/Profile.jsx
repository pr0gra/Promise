import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../constants/Colors/Colors";
import { ProfileImageContainer } from "./components/ProfileImageContainer";
import { InteractionButtons } from "./components/InteractionButtons";
import { FONTS } from "../../../src/constants/FONTS/FONTS";
import { PublicGoalsList } from "./components/PublicGoalsList";
import { Navigation } from "../../../src/components/Navigation/Navigation";
import axios from "axios";
import { tokenStore } from "../../../store";
import SkeletonLoading from "../../components/SkeletonLoading/SkeletonLoading";
import { Animated } from "react-native";
export const Profile = ({ navigation }) => {
  const token = tokenStore((state) => state.token);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [scrollY, setScrollY] = useState("up");
  // const heightSize = useRef(new Animated.Value(70)).current;
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
  useEffect(() => {
    getUserInfo();
  }, []);
  // const expand = () => {
  //   Animated.timing(heightSize, {
  //     toValue: 70,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start();
  // };
  // const noExpand = () => {
  //   Animated.timing(heightSize, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start();
  // };
  // useEffect(() => {
  //   if (scrollY === "up") {
  //     expand();
  //   } else {
  //     noExpand();
  //   }
  // }, [scrollY]);
  return (
    <View style={[styles.container]}>
      {userData?.first_name && userData?.last_name ? (
        <ProfileImageContainer
          navigation={navigation}
          firstName={userData?.first_name}
          lastName={userData?.last_name}
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
      {/* <Animated.View style={{ height: heightSize }}> */}
      <InteractionButtons />
      {/* </Animated.View> */}
      <PublicGoalsList
        token={token}
        firstName={userData?.first_name}
        lastName={userData?.last_name}
        // setScrollY={setScrollY}
      />
      <Navigation navigation={navigation} />
    </View>
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
