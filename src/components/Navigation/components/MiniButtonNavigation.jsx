import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const MiniButtonNavigation = ({
  image,
  text,
  styleText,
  selected = false,
  marginTop = false,
}) => {
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        width: 51,
      }}
    >
      <View style={selected && styles.paramsStyle}>
        <Image
          source={image}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </View>
      <Text style={[{ ...styleText, marginTop: marginTop ? 4 : 0 }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  paramsStyle: {
    backgroundColor: "rgba(145, 155, 204, 0.3)",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 100,
  },
});
