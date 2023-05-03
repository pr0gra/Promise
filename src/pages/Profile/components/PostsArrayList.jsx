import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { COLORS } from "../../../constants/Colors/Colors";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const PostsArrayList = ({ token, data, handleRefresh, loading }) => {
  return data?.map((e) => {
    return (
      <View style={styles.constainer} key={data.id}>
        <Text>{e.text}</Text>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  constainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.White,
    marginLeft: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
});
