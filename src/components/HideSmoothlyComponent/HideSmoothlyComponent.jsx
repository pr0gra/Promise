import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants/Colors/Colors";

export const HideSmoothlyComponent = ({
  height = 10,
  scrollY,
  bottom = undefined,
  children,
}) => {
  const diffClamp = Animated.diffClamp(scrollY, 0, height);
  const translateY = diffClamp.interpolate({
    inputRange: [0, height],
    outputRange: [0, -height],
  });
  return (
    <Animated.View
      style={{
        transform: [{ translateY: translateY }],
        zIndex: 5,
      }}
    >
      <View
        style={{
          position: "absolute",
          paddingBottom: 20,
          right: 0,
          left: 0,
          bottom: bottom,
          backgroundColor: COLORS.Background,
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({});
