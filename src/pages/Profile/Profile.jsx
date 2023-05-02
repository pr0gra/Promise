import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../constants/Colors/Colors";
import { ProfileImageContainer } from "./components/ProfileImageContainer";
import { InteractionButtons } from "./components/InteractionButtons";
import { FONTS } from "../../../src/constants/FONTS/FONTS";
import { PublicGoalsList } from "./components/PublicGoalsList";
import { Navigation } from "../../../src/components/Navigation/Navigation";
import axios from "axios";
import { tokenStore } from "../../../store";
import SkeletonLoading from "../../components/SkeletonLoading/SkeletonLoading";
export const Profile = ({ navigation }) => {
  const token = tokenStore((state) => state.token);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getUserInfo() {
    setLoading(true);
    try {
      const response = await axios.get("/api/profile", {
        headers: { Authorization: `bearer ${token}` },
      });

      setUserData(response.data.data);
      console.log(userData);
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

      <InteractionButtons />
      <PublicGoalsList token={token} />
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
