import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { Styles } from "../../../constants/GlobalStyles";
import { COLORS } from "../../../constants/Colors/Colors";
import axios from "axios";
import { useFonts } from "expo-font";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { KeyboardAvoidingView } from "react-native";
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я\s]+$/, "Имя должно содержать только буквы")
    .label("Имя")
    .required("Введите имя"),

  lastName: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я\s]+$/, "Фамилия должна содержать только буквы")
    .label("Фамилия")
    .required("Введите фамилию"),
  email: yup
    .string()

    .label("Email")
    .email("Адрес электронной почты должен быть действительным")
    .required("Введите email"),
  password: yup
    .string()
    .label("Password")
    .required("Введите пароль")
    .min(8, "Пароль должен состоять не менее чем из 8 символов"),
  confirmPassword: yup
    .string()
    .label("пароль")
    .required("подтвердите пароль")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});

const Form = ({ navigation }) => {
  const [Loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState(null);

  async function registerUser(values) {
    setLoading(true);
    try {
      const response = await axios.post("/api/users", {
        user: {
          first_name: values.firstName.trim(),
          last_name: values.lastName.trim(),
          email: values.email.trim(),
          password: values.password.trim(),
        },
      });
      navigation.navigate("SignIn");
      return response.data;
    } catch (error) {
      if (error.response) {
        setErrorEmail(error.response.data.errors.email[0]);
      } else {
        console.log("NO RESPONSE");
      }

      return error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.formContainer}>
      <ScrollView>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            registerUser(values);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <View>
                  <TextInput
                    style={[
                      styles.inputStyles,
                      touched.firstName &&
                        errors.firstName &&
                        styles.wrongInput,
                    ]}
                    placeholder="Имя"
                    value={values.firstName}
                    onBlur={handleBlur("firstName")}
                    onChangeText={handleChange("firstName")}
                    selectionColor={COLORS.Accent}
                  />

                  {touched.firstName && errors.firstName && (
                    <Text style={styles.errorMessage}>{errors.firstName}</Text>
                  )}
                </View>

                <View>
                  <TextInput
                    style={[
                      styles.inputStyles,
                      touched.lastName && errors.lastName && styles.wrongInput,
                    ]}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                    placeholder="Фамилия"
                    selectionColor={COLORS.Accent}
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={styles.errorMessage}>{errors.lastName}</Text>
                  )}
                </View>

                <View>
                  <TextInput
                    style={[
                      styles.inputStyles,
                      touched.email && errors.email && styles.wrongInput,
                    ]}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="email"
                    keyboardType="email-address"
                    selectionColor={COLORS.Accent}
                  />

                  {touched.email && (
                    <Text style={[styles.errorMessage, styles.errorWithMargin]}>
                      {touched.email && errors?.email}

                      {errorEmail && " " + errorEmail}
                    </Text>
                  )}
                </View>
                <View>
                  <TextInput
                    style={[
                      styles.inputStyles,
                      touched.password && errors.password && styles.wrongInput,
                    ]}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="Пароль"
                    secureTextEntry={true}
                    selectionColor={COLORS.Accent}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                <View>
                  <TextInput
                    style={[
                      styles.inputStyles,
                      touched.confirmPassword &&
                        errors.confirmPassword &&
                        styles.wrongInput,
                    ]}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    placeholder="Повторите пароль"
                    secureTextEntry={true}
                    selectionColor={COLORS.Accent}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorMessage}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>
              </View>

              <Button
                title="Submit"
                onPress={handleSubmit}
                mode="contained-tonal"
                style={styles.postButton}
                labelStyle={{ color: COLORS.White }}
                loading={Loading ? true : false}
                contentStyle={{
                  paddingVertical: 10,
                }}
              >
                <Text style={{ color: COLORS.White, ...FONTS.buttonText }}>
                  Зарегистрироваться
                </Text>
              </Button>
              <Button
                onPress={() => navigation.goBack()}
                mode="contained-tonal"
                contentStyle={{
                  paddingVertical: 10,
                }}
                style={{
                  marginTop: 15,
                  backgroundColor: COLORS.Gray,
                  borderRadius: 10,

                  fontSize: 12,
                  // fontFamily: "RobotoFlex",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: 16,
                  textAlign: "center",
                }}
              >
                <Text style={{ ...FONTS.buttonText, color: COLORS.Accent }}>
                  Назад
                </Text>
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: COLORS.White,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputContainer: {
    flexDirection: "column",
    gap: 20,
  },
  inputStyles: {
    backgroundColor: COLORS.White,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: COLORS.Black,
    fontFamily: "RobotoFlex",
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
  postButton: {
    backgroundColor: COLORS.Accent,
    marginTop: 30,

    fontSize: 12,
    fontFamily: "RobotoFlex",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 16,
    textAlign: "center",
    borderRadius: 10,
  },
  errorMessage: {
    marginLeft: 20,
    fontSize: 12,
    fontFamily: "RobotoFlex",
    // marginTop: 5,
    // marginBottom: -20,
    color: "red",
  },
  errorWithMargin: {
    marginBottom: -15,
  },
});
export default Form;
