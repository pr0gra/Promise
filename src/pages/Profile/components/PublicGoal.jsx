import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import axios from "axios";
import { tokenStore } from "../../../../store.js";
export const PublicGoal = ({ item, token }) => {
  const [loading, setLoading] = useState(false);
  console.log(item);
  const goalId = item?.id;
  const userId = item?.user_id;

  return (
    <View style={styles.container}>
      <View>
        <Text> тут аватарка и имя с временем</Text>
      </View>
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
    marginBottom: 10,
  },
  title: {
    ...FONTS.mainText,
  },
});
