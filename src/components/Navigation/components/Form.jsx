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
import { CreateGoalButton } from "./CreateGoalButton";
const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Поле обязательно для заполнения")
    .min(8, "Длина текста должна быть не менее 8 символов"),
});
export const Form = ({ time, setIsGoalVisible, noExpand, handleRefresh }) => {
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
      handleRefresh();
      return response.data;
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors.deadline);
        setDisabled(false);
      } else {
        console.log("NO RESPONSE");
      }
      return error;
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
              <Text style={styles.errorMessage}>
                Дата не должна быть прошедшей
              </Text>
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

            <CreateGoalButton
              onPress={handleSubmit}
              disabled={disabled}
              noExpand={noExpand}
              postedForm={postedForm}
            />
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

  errorMessage: {
    ...FONTS.buttonText,
    color: COLORS.Accent,
  },
});
