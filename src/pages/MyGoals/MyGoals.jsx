import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { FONTS } from "../../constants/FONTS/FONTS";
import { Goal } from "./components/Goal.jsx";

export const MyGoals = () => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "ios" ? 0 : 28,
        backgroundColor: COLORS.Background,
        flex: 1,
      }}
    >
      <Text
        style={[
          GlobalStyles.pageTitle,
          { marginLeft: 20, marginTop: 20, marginBottom: 20 },
        ]}
      >
        Новая цель
      </Text>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        indicatorStyle={COLORS.Accent}
      >
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
        <Goal />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Text>Навигация</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postButton: {
    backgroundColor: COLORS.Accent,
    marginTop: 10,
    lineHeight: 16,
    textAlign: "center",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    marginBottom: 29,
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});
