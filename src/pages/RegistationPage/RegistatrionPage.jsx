import React from "react";
import { View, Text, Platform, ScrollView } from "react-native";
import { COLORS } from "../../constants/Colors/Colors";
import { Styles } from "../../constants/GlobalStyles";
import Form from "./components/Form";
export const RegistatrionPage = ({ navigation }) => {
  return (
    <View
      style={{
        marginTop: Platform === "ios" ? 0 : 28,
        backgroundColor: COLORS.Background,
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Text style={Styles.pageTitle}>Регистрация</Text>
      <Form navigation={navigation} />
    </View>
  );
};
