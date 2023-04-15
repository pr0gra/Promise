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

import { FONTS } from "../../constants/FONTS/FONTS";
import { VKLoginComponent } from "./components/VKLoginCOmponent/VKLoginComponent.js";

export const SignInPage = ({ navigation }) => {
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

  const handleSubmit = (values) => {
    //Тестовый обработчик
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 1000);
    console.log(values);
  };

  return (
    <View style={[GlobalStyles.viewBasic]}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          style={{
            flex: 1,
            marginBottom: -150,
          }}
          source={require("../../../assets/images/rocket-illustration-3d-render.png")}
        />
      </View>
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
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
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
                </>
              )}
            </Formik>
          </TouchableWithoutFeedback>
        </View>

        <Text
          style={{
            textAlign: "center",
            paddingTop: 20,
            paddingBottom: 30,

            color: COLORS.Accent,
            ...FONTS.buttonText,
          }}
        >
          Забыли пароль?
        </Text>
        <View style={{ gap: 15 }}>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <View style={{ flex: 1 }}>
              <Button
                mode="tonal"
                style={[GlobalStyles.boldButton]}
                onPress={handleSubmit}
                contentStyle={{
                  paddingVertical: 10,
                }}
              >
                <Text style={{ color: COLORS.White, ...FONTS.buttonText }}>
                  Войти
                </Text>
              </Button>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
              }}
            >
              {/* <Image source={require("../../../assets/icons/Google.png")} /> */}

              <VKLoginComponent />
            </View>
          </View>

          <Button
            mode="tonal"
            style={GlobalStyles.transparentButton}
            contentStyle={{
              paddingVertical: 10,
            }}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.registationButton}>Зарегистрироваться</Text>
          </Button>
        </View>
      </View>
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
