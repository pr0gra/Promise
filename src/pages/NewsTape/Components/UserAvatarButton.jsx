import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { COLORS } from "../../../constants/Colors/Colors";

export const UserAvatarButton = ({ navigation, id, fullName }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile", { id: id })}
    >
      <UserAvatar
        style={{ width: 20 }}
        size={20}
        name={fullName !== "undefined undefined" ? fullName : ""}
        bgColor={COLORS.Accent}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
