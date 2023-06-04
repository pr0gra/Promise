import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useEffect } from "react";
import {
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import { COLORS } from "../../constants/Colors/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const SlideUpContainer = ({ isVisible, setIsVisible, children }) => {
  const { height } = Dimensions.get("window");
  const containerHeight = height * 0.8; // Высота контейнера

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Двигаем контейнер только если он видимый

        pan.setValue({ x: 0, y: gestureState.dy });
      },

      onPanResponderRelease: (_, gestureState) => {
        // Если пользователь сдвинул контейнер вниз или быстро потянул вниз, скрываем его

        if (gestureState.dy > 100 || gestureState.vy > 1) {
          hideContainer();
        } else {
          // Возвращаем контейнер на исходную позицию
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isVisible) {
      showContainer();
    } else {
      hideContainer();
    }
  }, [isVisible]);

  const showContainer = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const hideContainer = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: containerHeight },
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsVisible(false));
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: pan.y }],
          bottom: 70,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <LinearGradient
        colors={["rgba(231, 235, 255, 1)", "rgba(208, 214, 242, 1)"]}
        start={{
          x: 1,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={[styles.menuContainer]}
      >
        <View
          style={{
            borderRadius: 100,
            height: 4,
            width: 50,
            backgroundColor: COLORS.Accent,
            marginBottom: 20,
          }}
        ></View>
        <View>{children}</View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  contentContainer: {
    padding: 32,
  },
  menuContainer: {
    zIndex: 5,
    // backgroundColor: COLORS.LowAccent,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 36,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // flexDirection: "column",
    alignItems: "center",
    // gap: 20,
  },
});
