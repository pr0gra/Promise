import React from "react";
import { TextInput } from "react-native-paper";
import { COLORS } from "../../constants/Colors/Colors";
export const TextInput = (props) => {
  return <TextInput props selectionColor={COLORS.Accent} />;
};
