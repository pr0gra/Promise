import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EditProfileImage } from "./EditProfileImage";
import { EditProfileNameInput } from "./EditProfileNameInput";

export const EditProfileImageContainer = ({ handleNameChange, name }) => {
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
      <EditProfileNameInput handleNameChange={handleNameChange} name={name} />
    </View>
  );
};

const styles = StyleSheet.create({});
