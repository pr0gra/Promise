import { StyleSheet } from "react-native";
import { COLORS } from "./Colors/Colors.js";
import { Platform, PlatformIOSStatic } from "react-native";
export const GlobalStyles = {
  boldButton: {
    backgroundColor: COLORS.Accent,
    fontSize: 12,
    fontFamily: "Roboto-flex",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 16,
    textAlign: "center",
    borderRadius: 10,
    boxSizing: "border-box",
  },

  transparentButton: {
    backgroundColor: COLORS.Gray,
    borderRadius: 10,
    fontSize: 12,
    fontFamily: "Roboto-flex",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 16,
    textAlign: "center",
  },

  pageTitle: {
    fontFamily: "Roboto-flex",
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: 32,
    lineHeight: 38,
    color: COLORS.Accent,
  },

  inputStyles: {
    backgroundColor: COLORS.White,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: COLORS.Black,
    fontFamily: "Roboto-flex",
    fontStyle: "normal",
    height: 53,
    fontSize: 13,
    lineHeight: 15,
    borderColor: COLORS.GrayText,
    borderWidth: 1,
    borderRadius: 10,
  },

  wrongInput: {
    borderColor: "red",
  },

  viewBasic: {
    paddingTop: Platform.OS === "ios" ? 0 : 28,
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
