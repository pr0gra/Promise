import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";

export const PublicGoal = ({ item }) => {
  console.log(item);
  const goalId = item?.id;
  const userId = item?.user_id;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.White,
    borderRadius: 20,
  },
  title: {
    ...FONTS.mainText,
  },
});
