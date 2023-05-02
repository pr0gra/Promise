import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonLoading = ({
  loading = true,
  children,
  width = 30,
  height = 30,
  marginBottom = 0,
  padding = 0,
  borderRadius = 0,
  repeat = 1,
}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 350,
            useNativeDriver: false,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false,
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
                styles.skeleton,
                {
                  opacity,
                  width,
                  height,
                  marginBottom,
                  padding,
                  borderRadius,
                },
              ]}
            />
          </View>
        ))}
      </>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  skeleton: {
    backgroundColor: "white",
  },
});

export default SkeletonLoading;
