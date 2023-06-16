import { StyleSheet } from "react-native";
import { COLORS } from "./Colors/Colors.js";
import { Platform, PlatformIOSStatic } from "react-native";
import { FONTS } from "../constants/FONTS/FONTS.js";
export const GlobalStyles = {
  boldButton: {
    backgroundColor: COLORS.Accent,

    textAlign: "center",
    borderRadius: 10,
    boxSizing: "border-box",
    ...FONTS.buttonText,
  },

  transparentButton: {
    backgroundColor: COLORS.Gray,
    borderRadius: 10,

    textAlign: "center",
    ...FONTS.buttonText,
  },

  pageTitle: {
    ...FONTS.sectionHeader,
    color: COLORS.Accent,
  },

  inputStyles: {
    backgroundColor: COLORS.White,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: COLORS.Black,
    ...FONTS.label,
    borderColor: COLORS.GrayText,
    borderWidth: 1,
    borderRadius: 10,
  },

  wrongInput: {
    borderColor: "red",
  },

  viewBasic: {
    paddingTop: 32,
    backgroundColor: COLORS.Background,
    flex: 1,
    justifyContent: "flex-end",
  },
  inputsContainer: {
    paddingRight: 20,
    paddingBottom: 30,
    paddingTop: 30,
    paddingLeft: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.White,
  },
};
