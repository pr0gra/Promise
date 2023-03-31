import React from "react";
import { Text, View, Image } from "react-native";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import { COLORS } from "../../../constants/Colors/Colors";

export const TitleOfPage = ({ name }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingRight: 30,
        paddingLeft: 30,
        paddingBottom: 20,
        alignItems: "center",
        gap: 10,
        justifyContent: "space-between",
      }}
    >
      <Text
        style={[GlobalStyles.pageTitle]}
        lineBreakMode="break-all"
        numberOfLines={5}
      >
        Здравствуйте, {name}!
      </Text>
      <View
        style={{
          borderWidth: 2,
          borderColor: COLORS.Accent,
          borderStyle: "dashed",
          width: 70,
          height: 70,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          // marginRight: 30,
        }}
      >
        <Image source={require("../../../../assets/icons/camera-02.png")} />
      </View>
    </View>
  );
};
