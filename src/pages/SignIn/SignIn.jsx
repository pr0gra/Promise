import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { COLORS } from "../../constants/Colors/Colors";

export const SignIn = ({ navigation }) => {
  return (
    <View>
      <Text>SignIn</Text>
      <Button onPress={() => navigation.navigate("SignOut")}>
        <Text
          style={{
            fontFamily: "Roboto-flex",
            fontWeight: "bold",
            color: COLORS.Accent,
            fontSize: 20,
          }}
        >
          перейти к Регистрации
        </Text>
      </Button>
    </View>
  );
};
