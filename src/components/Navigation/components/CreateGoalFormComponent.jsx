import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { tokenStore } from "../../../../store";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { COLORS } from "../../../constants/Colors/Colors";
import { Checkbox } from "react-native-paper";
import { TouchableHighlight, TouchableOpacity } from "@gorhom/bottom-sheet";
import { CheckboxContainer } from "./CheckboxContainer";

export const CreateGoalFormComponent = ({
  checked,
  setChecked,
  title,
  setTitle,
  errorLengthOfTitle,
}) => {
  const [checkedNormal, setCheckedNormal] = useState(true);
  const token = tokenStore((state) => state.token);
  const [postedForm, setPostedForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  return (
    <View style={{ width: "100%" }}>
      <View style={{ marginBottom: 18 }}>
        {errorLengthOfTitle && (
          <Text style={{ color: COLORS.Red }}>
            Длина текста, должна быть не меньше 8 символов
          </Text>
        )}
        <TextInput
          // autoFocus={true}
          label="добиться цели"
          placeholder="добиться цели"
          value={title}
          multiline
          numberOfLines={2}
          onChangeText={(e) => {
            setTitle(e);
          }}
          textAlignVertical="top"
          selectionColor={COLORS.LowAccent}
          placeholderTextColor={"rgba(145, 155, 204, 0.3)"}
          style={[
            styles.input,
            {
              width: windowWidth - 40,
              textAlign: "auto",
              ...FONTS.typography,
              color: "rgba(145, 155, 204, 0.7)",
              maxHeight: 100,
            },
          ]}
        />

        {errorMessage && (
          <Text style={styles.errorMessage}>Дата не должна быть прошедшей</Text>
        )}
      </View>

      <CheckboxContainer checked={checked} setChecked={setChecked} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    // marginLeft: 40,
    // marginBottom: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    gap: 13,
    // marginBottom: 36,
    // alignContent: "center",
    // justifyContent: "center",
    // textAlign: "center",
    // marginLeft: 40,
  },

  errorMessage: {
    ...FONTS.buttonText,
    color: COLORS.Red,
  },
});
