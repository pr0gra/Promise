import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";

export const DarkBackround = ({
  setIsMenuVisible,
  setStateNavigation,
  noExpand,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsMenuVisible(false);
        noExpand();
        setStateNavigation("");
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 71,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          height: "100%",
          width: "100%",
        }}
      ></View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});
