import React from "react";
import { View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import { GlobalStyles } from "../../constants/GlobalStyles.js";
import { COLORS } from "../../constants/Colors/Colors.js";
import { TitleOfPage } from "./components/TitleOfPage.js";
import { FormSection } from "./components/FormSection.js";
export const WelcomePage = ({ navigation }) => {
  return (
    <View style={GlobalStyles.viewBasic}>
      <TitleOfPage name={"Пётр"} />
      <View style={[GlobalStyles.inputsContainer]}>
        <FormSection navigation={navigation} />
      </View>
    </View>
  );
};
