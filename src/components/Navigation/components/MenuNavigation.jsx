import React, { memo, useEffect, useRef } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Text, View, Image, StyleSheet, PanResponder } from "react-native";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { userInformationStore, tokenStore } from "../../../../store";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Animated } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { Dialog, Portal } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import SkeletonLoading from "../../SkeletonLoading/SkeletonLoading";
export const MenuNavigation = memo(
  ({ userData, navigation, setIsMenuVisible, isMenuVisible, noExpand }) => {
    const data = JSON.parse(userData);
    const userInformation = userInformationStore(
      (state) => state.userInformation
    );

    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsMenuVisible(false);
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              height: "100%",
              width: "100%",
              position: "absolute",
              bottom: 70,
              zIndex: 5,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <LinearGradient
          colors={["rgba(231, 235, 255, 1)", "rgba(208, 214, 242, 1)"]}
          start={{
            x: 1,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={[styles.menuContainer]}
        >
          <View
            style={{
              width: 50,
              height: 4,
              backgroundColor: COLORS.Accent,
              left: "50%",
              marginLeft: -25,
              borderRadius: 100,
            }}
          ></View>

          <TouchableWithoutFeedback
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
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: "column", gap: 20, marginTop: 20 }}>
            <TouchableWithoutFeedback
              onPress={() => {
                // navigation.navigate("friends");
                // setIsMenuVisible(false);
                {
                }
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
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
            </TouchableWithoutFeedback>
          </View>
        </LinearGradient>
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
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  profileLinkContainer: {
    flexDirection: "column",
    gap: 5,
  },
});
