import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonLoading = ({
  loading = true,
  repeat = 1,
  backgroundColor = "white",
  ...rest
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
                {
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
