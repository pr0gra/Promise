import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import { Button, Checkbox, IconButton, Surface } from "react-native-paper";
import * as yup from "yup";
import Animated from "react-native-reanimated";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { useEffect, useRef, useState } from "react";
import { tokenStore } from "../../../../store";
import axios from "axios";
const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Поле обязательно для заполнения")
    .min(8, "Длина текста должна быть не менее 8 символов"),
});
export const Form = ({ time, setIsGoalVisible }) => {
  const [checkedNormal, setCheckedNormal] = useState(true);
  const token = tokenStore((state) => state.token);
  const [postedForm, setPostedForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [disabled, setDisabled] = useState(false);
  async function createGoal(title, deadline) {
    setPostedForm(false);
    setErrorMessage(null);
    setDisabled(true);
    try {
      const response = await axios.post(
        "/api/goals",

        {
          goal: {
            title: title,
            deadline: deadline,
          },
        },
        { headers: { Authorization: `bearer ${token}` } }
      );
      setPostedForm(true);

      console.log("Отправлено");
      return response.data;
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors.deadline);
      } else {
        console.log("NO RESPONSE");
      }
      return error;
    } finally {
      setIsGoalVisible(false);
    }
  }
  const handleSubmit = (values) => {
    const cantPost = !values.title || !time;
    if (!cantPost) {
      createGoal(values.title, time + "T23:00");
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ title: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View>
              <TextInput
                autoFocus={true}
                label="Расскажи о себе"
                placeholder="Расскажи о себе"
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                textAlignVertical="top"
                selectionColor={COLORS.LowAccent}
                placeholderTextColor={"rgba(145, 155, 204, 0.3)"}
                style={[
                  styles.input,
                  {
                    textAlign: "auto",
                    ...FONTS.typography,
                    color: "rgba(145, 155, 204, 0.7)",
                  },
                ]}
              />
            </View>

            {touched.title && errors.title && (
              <Text style={styles.errorMessage}>{errors.title}</Text>
            )}
            {errorMessage && (
              <Text style={styles.errorMessage}>Дата должна быть после</Text>
            )}
            <TouchableWithoutFeedback
              onPress={() => setCheckedNormal((state) => !state)}
              style={{ height: 50 }}
            >
              <View style={styles.checkboxContainer}>
                <View pointerEvents="none">
                  <Checkbox
                    status={checkedNormal ? "checked" : "unchecked"}
                    color={COLORS.Accent}
                  />
                </View>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 15,
                    lineHeight: 18,
                    color: COLORS.Accent,
                  }}
                >
                  Опубликовать
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <Surface
              style={[styles.surface]}
              elevation={3}
              shadowColor={"rgba(145, 155, 204, 0.3)"}
              shadowOpacity={1}
            >
              <Animated.View
                style={{
                  alignTimes: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  size={30}
                  mode="contained"
                  style={[styles.button, { width: "100%" }]}
                  iconColor={COLORS.LowAccent}
                  icon={
                    postedForm
                      ? require("../../../../assets/icons/check.png")
                      : require("../../../../assets/icons/plus.png")
                  }
                  disabled={disabled}
                />
              </Animated.View>
            </Surface>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    height: 50,
    marginBottom: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 36,
  },
  button: {
    backgroundColor: COLORS.Accent,
    marginTop: -17,
    borderRadius: 30,
    // width: 70,
    height: 70,
  },
  surface: {
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 15 },
    // shadowOpacity: 0.15,
    shadowRadius: 4,
    backgroundColor: "transparent",
    flex: 1,
    // height: 70,

    borderRadius: 30,
  },
  errorMessage: {
    ...FONTS.buttonText,
    // fontSize: 20,
    color: COLORS.Accent,
  },
});
