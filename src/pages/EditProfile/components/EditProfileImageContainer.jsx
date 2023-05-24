import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EditProfileImage } from "./EditProfileImage";
import { EditProfileNameInput } from "./EditProfileNameInput";

export const EditProfileImageContainer = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        marginHorizontal: 20,
      }}
    >
      <EditProfileImage />
      <EditProfileNameInput />
    </View>
  );
};

const styles = StyleSheet.create({});
