import React, { memo, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, Image, StyleSheet, PanResponder } from "react-native";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { userInformationStore, tokenStore } from "../../../../store";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Animated } from "react-native";
// import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { Dialog, Portal } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import SkeletonLoading from "../../SkeletonLoading/SkeletonLoading";
import { SlideUpContainer } from "../../SlideUpContainer/SlideUpContainer";
export const MenuComponent = memo(
  ({ navigation, setIsMenuVisible, setIsFriendsVisible }) => {
    const userInformation = userInformationStore(
      (state) => state.userInformation
    );

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile", { id: userInformation.id });
            setIsMenuVisible(false);
          }}
        >
          <View style={styles.avatarContainer}>
            {userInformation.first_name && userInformation.last_name ? (
              <UserAvatar
                size={62}
                imageStyle={{ width: 62.6, height: 62.6, borderRadius: 15 }}
                name={`${userInformation.first_name} ${userInformation.last_name}`}
                style={{ width: 62.6, height: 62.6, borderRadius: 15 }}
                bgColor={COLORS.Accent}
              />
            ) : (
              <SkeletonLoading width={62.5} height={62.5} borderRadius={15} />
            )}

            <View style={styles.profileLinkContainer}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...FONTS.smallerSectionHeader,
                    color: COLORS.Accent,
                  }}
                >
                  Профиль
                </Text>
                <Image
                  source={require("../../../../assets/icons/chevron-right.png")}
                  style={{ width: 24, height: 24, marginBottom: -5 }}
                />
              </View>

              {!userInformation.first_name && !userInformation.last_name ? (
                <SkeletonLoading width={100} height={25} borderRadius={20} />
              ) : (
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 14,
                    color: COLORS.Accent,
                  }}
                >
                  {userInformation.first_name} {userInformation.last_name}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "column", gap: 20, marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate("friends");
              setIsFriendsVisible(true);
              setIsMenuVisible(false);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../assets/icons/users-01.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ ...FONTS.mainText, color: COLORS.Accent }}>
                Друзья
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate("settings");
              // setIsMenuVisible(false);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../assets/icons/settings-01.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ ...FONTS.mainText, color: COLORS.Accent }}>
                Настройки
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate("aboutApp");
              // setIsMenuVisible(false);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../assets/icons/info-circle.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ ...FONTS.mainText, color: COLORS.Accent }}>
                О приложении
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
);
const styles = StyleSheet.create({
  menuContainer: {
    zIndex: 5,
    backgroundColor: COLORS.LowAccent,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 36,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  avatarContainer: {
    width: "100%",
    marginBottom: 22,

    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  profileLinkContainer: {
    flexDirection: "column",
    gap: 5,
  },
});
