import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { userInformationStore } from "../../../../store";
import { COLORS } from "../../../constants/Colors/Colors";

export const EditProfileImage = () => {
  const userInformation = userInformationStore(
    (state) => state.userInformation
  );

  return (
    <View style={{ position: "relative" }}>
      <UserAvatar
        style={{ zIndex: 2 }}
        size={70}
        name={`${userInformation.first_name} ${userInformation.last_name}`}
        bgColor={COLORS.Accent}
      />
      <Image
        style={{
          width: 35,
          height: 35,
          marginTop: -30,
          zIndex: 5,
          marginLeft: 40,
        }}
        source={require("../../../../assets/icons/edit-photo-of-profile.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
