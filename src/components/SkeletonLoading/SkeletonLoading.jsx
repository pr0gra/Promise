import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonLoading = ({
  loading = true,
  repeat = 1,
  backgroundColor = "white",
  frequency = 350,
  ...rest
}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: frequency,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: frequency,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  if (loading) {
    return (
      <>
        {[...Array(repeat)].map((_, index) => (
          <View style={styles.container} key={index}>
            <Animated.View
              style={[
                {
                  opacity,
                  backgroundColor,
                  ...rest,
                },
              ]}
            />
          </View>
        ))}
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

export default SkeletonLoading;
