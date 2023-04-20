import React, { useEffect } from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { GlobalStyles } from "../../constants/GlobalStyles.js";
import { COLORS } from "../../constants/Colors/Colors.js";
import { TitleOfPage } from "./components/TitleOfPage.js";
import { FormSection } from "./components/FormSection.js";
export const WelcomePage = ({ navigation }) => {
  return (
    <View style={[GlobalStyles.viewBasic]}>
      <ScrollView contentContainerStyle={styles.content}>
        <TitleOfPage name={"Пётр"} />
        <View style={[GlobalStyles.inputsContainer]}>
          <FormSection navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
