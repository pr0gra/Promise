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
export const MenuNavigation = memo(
  ({ userData, navigation, setIsMenuVisible, isMenuVisible, noExpand }) => {
    const data = JSON.parse(userData);

    return (
      <Portal>
        <Dialog
          visible={isMenuVisible}
          onDismiss={() => {
            setIsMenuVisible(false);
            noExpand();
          }}
          style={{
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Dialog.Content
            style={{
              paddingHorizontal: 0,
              marginTop: 0,
              paddingBottom: 0,
            }}
          >
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
                  navigation.navigate("WelcomePage");
                  setIsMenuVisible(false);
                }}
              >
                <View style={styles.avatarContainer}>
                  <UserAvatar
                    size={62}
                    imageStyle={{ width: 62.6, height: 62.6, borderRadius: 15 }}
                    name={`${data?.first_name} ${data?.last_name}`}
                    style={{ width: 62.6, height: 62.6, borderRadius: 15 }}
                    src={"https://dummyimage.com/100x100/000/fff"}
                    bgColor={COLORS.Accent}
                  />
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
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: 14,
                        color: COLORS.Accent,
                      }}
                    >
                      {data?.first_name} {data?.last_name}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ flexDirection: "column", gap: 20, marginTop: 20 }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("friends");
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
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("settings");
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
                    navigation.navigate("aboutApp");
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
          </Dialog.Content>
        </Dialog>
      </Portal>
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
