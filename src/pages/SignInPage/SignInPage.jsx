import { Formik } from "formik";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Text } from "react-native-paper";
import * as yup from "yup";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";

export const SignInPage = ({ navigation }) => {
  const login = async () => {
    try {
      const result = await VKLogin.login(["email"]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Вызов функции для авторизации пользователя

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
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
            fontFamily: "Roboto-flex",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: 14,
            lineHeight: 16,
            color: COLORS.Accent,
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
                <Text
                  style={{
                    fontFamily: "Roboto-flex",
                    fontWeight: "bold",
                    color: COLORS.White,
                    fontSize: 14,
                  }}
                >
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
              <Image source={require("../../../assets/icons/Google.png")} />

              <TouchableWithoutFeedback onPress={login}>
                <Image source={require("../../../assets/icons/VK.png")} />
              </TouchableWithoutFeedback>
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
            <Text
              style={{
                fontFamily: "Roboto-flex",
                fontWeight: "bold",
                color: COLORS.Accent,
                fontSize: 14,
              }}
            >
              Зарегистрироваться
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
