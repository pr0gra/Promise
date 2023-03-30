import React from "react";
import { View, Text, Platform, ScrollView, SafeAreaView } from "react-native";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import Form from "./components/Form";
export const RegistatrionPage = ({ navigation }) => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "ios" ? 0 : 28,
        backgroundColor: COLORS.Background,
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Text style={GlobalStyles.pageTitle}>Регистрация</Text>
      <Form navigation={navigation} />
    </View>
  );
};
