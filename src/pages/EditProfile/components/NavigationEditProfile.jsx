import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";

export const NavigationEditProfile = ({ navigation }) => {
  return (
    <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
      <IconButton
        mode="contained"
        onPress={() => navigation.goBack()}
        size={24}
        icon={require("../../../../assets/icons/arrow-narrow-left.png")}
        style={{
          backgroundColor: "transparent",
          borderRadius: 20,
          marginLeft: 20,
        }}
        iconColor={COLORS.Accent}
        zIndex={150}
      />
      <Text style={{ ...FONTS.smallerSectionHeader, color: COLORS.Accent }}>
        Редактирование
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
