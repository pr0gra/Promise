import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import { axios } from "axios";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { COLORS } from "../../../constants/Colors/Colors";

export const ProfileModalContainer = ({
  isModalVisible,
  setModalIsVisible,
  navigation,
}) => {
  return (
    <Portal>
      <Dialog
        visible={isModalVisible}
        onDismiss={() => {
          setModalIsVisible(false);
        }}
        style={{
          marginRight: 0,
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <Dialog.Content
          style={{
            paddingHorizontal: 0,
            marginTop: 0,
            paddingBottom: 0,
          }}
        >
          <Button
            onPress={() => {
              setModalIsVisible(false);
              navigation.navigate("EditProfile");
            }}
            labelStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
          >
            <Text style={{ ...FONTS.postButtonText, color: COLORS.Accent }}>
              Редактировать профиль
            </Text>
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({});
