import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { Styles } from "../../../constants/GlobalStyles";
import { COLORS } from "../../../constants/Colors/Colors";

const validationSchema = yup.object().shape({
  firstName: yup.string().label("First Name").required(),
  lastName: yup.string().label("Last Name").required(),
  email: yup.string().label("Email").email().required(),
  password: yup.string().label("Password").required().min(6),
  confirmPassword: yup
    .string()
    .label("Confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Form = ({ navigation }) => {
  const [Loading, setLoading] = useState(false);
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
            setLoading(true);
            console.log(values);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
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
                <TextInput
                  style={[
                    styles.inputStyles,
                    touched.firstName && errors.firstName && styles.wrongInput,
                  ]}
                  placeholder="Имя"
                  value={values.firstName}
                  onBlur={handleBlur("firstName")}
                  onChangeText={handleChange("firstName")}
                />

                {/* {touched.firstName && errors.firstName && (
                  <Text>{errors.firstName}</Text>
                )} */}

                <TextInput
                  style={[
                    styles.inputStyles,
                    touched.lastName && errors.lastName && styles.wrongInput,
                  ]}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  placeholder="Фамилия"
                />
                {/* {touched.lastName && errors.lastName && (
                  <Text>{errors.lastName}</Text>
                )} */}

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
                />
                {/* {touched.email && errors.email && <Text>{errors.email}</Text>} */}

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
                />
                {/* {touched.password && errors.password && (
                  <Text>{errors.password}</Text>
                )} */}

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
                />
                {/* {touched.confirmPassword && errors.confirmPassword && (
                  <Text>{errors.confirmPassword}</Text>
                )} */}
              </View>
              {!Loading ? (
                <Button
                  title="Submit"
                  onPress={handleSubmit}
                  mode="contained-tonal"
                  style={styles.postButton}
                  contentStyle={{
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ fontSize: 14, color: COLORS.White }}>
                    Зарегистрироваться
                  </Text>
                </Button>
              ) : (
                <Button
                  title="Submit"
                  onPress={handleSubmit}
                  mode="contained-tonal"
                  style={styles.postButton}
                  labelStyle={{ color: COLORS.White }}
                  loading={true}
                  contentStyle={{
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ fontSize: 14, color: COLORS.White }}>
                    Зарегистрироваться
                  </Text>
                </Button>
              )}
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
                  fontFamily: "Roboto-flex",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: 16,
                  textAlign: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: COLORS.Accent }}>
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
    color: COLORS.GrayText,
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
  postButton: {
    backgroundColor: COLORS.Accent,
    marginTop: 30,

    fontSize: 12,
    fontFamily: "Roboto-flex",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 16,
    textAlign: "center",
    borderRadius: 10,
  },
});
export default Form;
