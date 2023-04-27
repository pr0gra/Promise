import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconButton, Surface } from "react-native-paper";
import Animated from "react-native-reanimated";
import { COLORS } from "../../../constants/Colors/Colors";

export const CreateGoalButton = ({
  onPress,
  disabled,
  postedForm,
  noExpand,
}) => {
  return (
    <Surface
      style={[styles.surface]}
      elevation={3}
      shadowColor={"rgba(145, 155, 204, 0.3)"}
      shadowOpacity={1}
    >
      <Animated.View
        style={{
          alignTimes: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <IconButton
          onPress={() => {
            onPress();
            noExpand();
          }}
          size={30}
          mode="contained"
          style={[styles.button, { width: "100%" }]}
          iconColor={COLORS.LowAccent}
          icon={
            postedForm
              ? require("../../../../assets/icons/check.png")
              : require("../../../../assets/icons/plus.png")
          }
          disabled={disabled}
        />
      </Animated.View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.Accent,
    marginTop: -17,
    borderRadius: 30,
    height: 70,
  },
  surface: {
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 15 },
    shadowRadius: 4,
    backgroundColor: "transparent",
    flex: 1,
    borderRadius: 30,
  },
});
