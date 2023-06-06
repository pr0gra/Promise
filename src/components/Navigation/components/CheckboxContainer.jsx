import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import { TouchableHighlight } from "@gorhom/bottom-sheet";

export const CheckboxContainer = ({ checked, setChecked }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 13 }}>
      <View>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          color={COLORS.Accent}
          onPress={() => setChecked((state) => !state)}
        />
      </View>
      <Text
        style={{
          fontSize: 15,
          lineHeight: 18,
          color: COLORS.Accent,
          fontWeight: "600",
        }}
      >
        Опубликовать
      </Text>
    </View>
  );
};
