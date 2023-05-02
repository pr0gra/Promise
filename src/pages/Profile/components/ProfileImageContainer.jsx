import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import UserAvatar from "react-native-user-avatar";
export const ProfileImageContainer = ({ navigation, firstName, lastName }) => {
  return (
    <View style={[styles.imageContainer]}>
      <IconButton
        mode="contained"
        onPress={() => navigation.goBack()}
        size={24}
        icon={require("../../../../assets/icons/arrow-narrow-left.png")}
        style={[styles.buttonBack]}
        iconColor={COLORS.Accent}
      />
      {firstName && lastName && (
        <UserAvatar
          size={100}
          imageStyle={{ borderRadius: 100 }}
          name={`${firstName} ${lastName}`}
          style={{ borderRadius: 100 }}
          // src={"https://dummyimage.com/100x100/000/fff"}
          bgColor={COLORS.Accent}
        />
      )}
      <IconButton
        mode="contained"
        onPress={() => console.log("...")}
        size={24}
        icon={require("../../../../assets/icons/dots-vertical.png")}
        style={[styles.buttonBack]}
        iconColor={COLORS.Accent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  buttonBack: {
    backgroundColor: "transparent",
    borderRadius: 20,
  },
});
