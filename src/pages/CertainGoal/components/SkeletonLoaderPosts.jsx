import React from "react";
import { View, StyleSheet, Animated } from "react-native";

export  const SkeletonLoaderPosts = ({ loading = true, children }) => {
  const opacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
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
      <View style={styles.container}>
        <Animated.View style={[styles.skeleton, { opacity }]} />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1,
    height: 200,
  },
  skeleton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    width: "100%",
    height: 120,
  },
});


