import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "react-native-user-avatar";
import { userInformationStore } from "../../../../store";
import { COLORS } from "../../../constants/Colors/Colors";
import { IconButton } from "react-native-paper";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import { Dimensions } from "react-native";

export const EditProfileNameInput = ({ handleNameChange, name }) => {
  const userName = userInformationStore((state) => state.userInformation);
  const windowWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        backgroundColor: COLORS.LowAccent,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <TextInput
        placeholder={userName.first_name + " " + userName.last_name}
        value={name}
        onChangeText={(e) => {
          handleNameChange(e);
        }}
        selectionColor={COLORS.Accent}
        placeholderTextColor={COLORS.Accent}
        multiline={false}
        numberOfLines={1}
        style={[
          {
            borderRadius: 10,
            textAlign: "left",
            alignItems: "center",
            maxWidth: windowWidth - 44 - 70 - 90,
            flex: 1,
            borderColor: COLORS.LowAccent,
            color: COLORS.Accent,
            padding: 0,
            fontWeight: "700",
            fontSize: 23,
          },
        ]}
      />
      <Image
        source={require("../../../../assets/icons/edit-02.png")}
        style={{ height: 24, width: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
