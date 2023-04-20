import React, { memo, useEffect, useRef } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Text, View, Image, StyleSheet } from "react-native";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { userInformationStore, tokenStore } from "../../../../store";
import { PanGestureHandler, State } from "react-native-gesture-handler";

export const MenuInNavigation = memo(({ userData, navigation }) => {
  const data = JSON.parse(userData);

  return (
    <View style={[styles.menuContainer]}>
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
        onPress={() => navigation.navigate("WelcomePage")}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../../../assets/images/user-avatar.png")} //Пока статичная картинка, так как на бекенде нет возможности получить картинку
            style={{ width: 62.6, height: 62.6, borderRadius: 15 }}
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
          onPress={() => navigation.navigate("friends")}
        >
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
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
          onPress={() => navigation.navigate("settings")}
        >
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
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
          onPress={() => navigation.navigate("aboutApp")}
        >
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
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
    </View>
  );
});
const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    overflow: "hidden",
    bottom: 71,
    zIndex: 5,
    backgroundColor: COLORS.LowAccent,
    width: "100%",
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
