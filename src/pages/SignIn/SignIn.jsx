import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export const SignIn = ({ navigation }) => {
  return (
    <View>
      <Text>SignIn</Text>
      <Button onPress={() => navigation.navigate("SignOut")}>
        перейти к Регистрации
      </Button>
    </View>
  );
};
