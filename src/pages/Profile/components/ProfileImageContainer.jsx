import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import UserAvatar from "react-native-user-avatar";
import { HideSmoothlyComponent } from "../../../components/HideSmoothlyComponent/HideSmoothlyComponent";
export const ProfileImageContainer = ({
  navigation,
  firstName,
  lastName,
  scrollY,
}) => {
  const diffClamp = Animated.diffClamp(scrollY, 0, 150);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
  });
  const diffClampnavigationButtons = Animated.diffClamp(scrollY, 0, 150);
  const translateYnavigationButtons = diffClampnavigationButtons.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 160],
  });
  return (
    <View style={[styles.imageContainer]}>
      <Animated.View
        style={{ transform: [{ translateY: translateYnavigationButtons }] }}
      >
        <IconButton
          mode="contained"
          onPress={() => navigation.goBack()}
          size={24}
          icon={require("../../../../assets/icons/arrow-narrow-left.png")}
          style={[styles.buttonBack]}
          iconColor={COLORS.Accent}
          zIndex={150}
        />
      </Animated.View>
      {firstName && lastName && (
        <Animated.View style={{ transform: [{ translateY: translateY }] }}>
          <UserAvatar
            size={100}
            // imageStyle={{ borderRadius: 100 }}
            name={`${firstName} ${lastName}`}
            style={{
              borderRadius: 100,
              width: 100,
              // marginLeft: -50
            }}
            // src={"https://dummyimage.com/100x100/000/fff"}
            bgColor={COLORS.Accent}
          />
        </Animated.View>
      )}
      <Animated.View
        style={{
          transform: [{ translateY: translateYnavigationButtons }],
          zIndex: 100,
        }}
      >
        <IconButton
          mode="contained"
          onPress={() => console.log("...")}
          size={24}
          icon={require("../../../../assets/icons/dots-vertical.png")}
          style={[styles.buttonBack]}
          iconColor={COLORS.Accent}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    zIndex: 10000,
  },
  buttonBack: {
    backgroundColor: "transparent",
    borderRadius: 20,
  },
});
