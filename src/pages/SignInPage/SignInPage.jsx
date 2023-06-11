import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { Button, Text } from "react-native-paper";
import * as yup from "yup";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import rocketImg from "../../../assets/images/rocket-illustration-3d-render.png";
import { FONTS } from "../../constants/FONTS/FONTS";

import axios from "axios";
import SecureStore from "expo-secure-store";
import { tokenStore } from "../../../store.js";
import { Platform } from "react-native";

// async function SaveToken(key, value) { ЗАГОТОВКА ДЛЯ СОХРАНЕНИЯ ТОКЕНА
//   console.log(key, value);
//   try {
//     await SecureStore.setItemAsync(key, value);
//     console.log("Data successfully saved");
//   } catch (error) {
//     console.log("Error saving data", error);
//   }
// }

export const SignInPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const token = tokenStore((state) => state.token);
  const setToken = tokenStore((state) => state.setToken);
  const [userExistError, setUserExistError] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Неверный адрес электронной почты")
      .required("Требуется электронная почта"),
    password: yup
      .string()
      .min(8, "Пароль должен состоять не менее чем из 8 символов")
      .required("Требуется ввести пароль"),
  });

  async function loginUser(email, password) {
    setUserExistError(false);
    try {
      setLoading(true);
      const response = await axios.post("/api/tokens", {
        user: {
          email: email,
          password: password,
        },
      });
      setToken(response.data.data.token.toString());

      // SaveToken("user_token", response.data.data.token);
      navigation.reset({
        index: 0,
        routes: [{ name: "MyGoals" }],
      });
      navigation.navigate("MyGoals"); //welcome
    } catch (error) {
      console.log(error);

      setUserExistError(true);

      return error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[GlobalStyles.viewBasic]}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            flex: 1,
            width: 400,
            marginBottom: -200,
          }}
          source={require("../../../assets/images/rocket-illustration-3d-render.png")}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "" : "padding"}
      >
        <Text
          style={[GlobalStyles.pageTitle, { marginLeft: 30, marginBottom: 20 }]}
        >
          Вход
        </Text>

        <View style={GlobalStyles.inputsContainer}>
          <View style={{ gap: 20 }}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => loginUser(values.email, values.password)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <>
                    <Text
                      style={{
                        display: userExistError ? "flex" : "none",
                        color: "red",
                      }}
                    >
                      Неверный логин или пароль
                    </Text>

                    <TextInput
                      label="Email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Email"
                      keyboardType="email-address"
                      selectionColor={COLORS.Accent}
                      style={[
                        GlobalStyles.inputStyles,
                        errors.email && GlobalStyles.wrongInput,
                      ]}
                    />

                    <TextInput
                      label="Password"
                      placeholder="Пароль"
                      leftIcon={{ type: "font-awesome", name: "lock" }}
                      onBlur={handleBlur("password")}
                      onChangeText={handleChange("password")}
                      value={values.password}
                      secureTextEntry
                      errorMessage={errors.password}
                      selectionColor={COLORS.Accent}
                      style={[
                        GlobalStyles.inputStyles,
                        errors.email && GlobalStyles.wrongInput,
                      ]}
                    />

                    <Text
                      style={{
                        textAlign: "center",

                        color: COLORS.Accent,
                        ...FONTS.buttonText,
                      }}
                    >
                      Забыли пароль?
                    </Text>

                    <View style={{ gap: 15 }}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                          <Button
                            mode="tonal"
                            style={[GlobalStyles.boldButton]}
                            onPress={handleSubmit}
                            contentStyle={{
                              paddingVertical: 10,
                            }}
                            labelStyle={{ color: COLORS.White }}
                            loading={loading ? true : false}
                          >
                            <Text
                              style={{
                                color: COLORS.White,
                                ...FONTS.buttonText,
                              }}
                            >
                              Войти
                            </Text>
                          </Button>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",

                            alignItems: "center",
                          }}
                        ></View>
                      </View>

                      <Button
                        mode="tonal"
                        style={GlobalStyles.transparentButton}
                        contentStyle={{
                          paddingVertical: 10,
                        }}
                        onPress={() => navigation.navigate("SignUp")}
                      >
                        <Text style={styles.registationButton}>
                          Зарегистрироваться
                        </Text>
                      </Button>
                    </View>
                  </>
                )}
              </Formik>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  registationButton: {
    ...FONTS.buttonText,
    color: COLORS.Accent,
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
