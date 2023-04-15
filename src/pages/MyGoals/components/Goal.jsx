import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";

export const Goal = () => {
  return (
    <View style={styles.goalContainer}>
      <View style={styles.top}>
        <Text style={{ ...FONTS.goalTime, color: COLORS.Accent }}>Хочу к</Text>
        <Image
          source={require("../../../../assets/icons/clock.png")}
          style={styles.image}
        />
        <Text style={{ ...FONTS.goalTime, color: COLORS.Accent }}>13 мая</Text>
      </View>
      <Text style={{ ...FONTS.goalTime, color: "rgba(145, 155, 204, 0.5)" }}>
        Заработать Миллион
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    padding: 20,
    backgroundColor: COLORS.White,
    borderRadius: 20,
    marginBottom: 20,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 12,
    marginLeft: 12,
  },
});
