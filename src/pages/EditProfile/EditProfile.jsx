import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { EditProfileForm } from "./components/EditProfileForm";
import { COLORS } from "../../constants/Colors/Colors";
import { Button, IconButton } from "react-native-paper";
import { FONTS } from "../../constants/FONTS/FONTS";

export const EditProfile = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: 32,
        backgroundColor: COLORS.Background,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <EditProfileForm navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
