import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput, Alert } from "react-native";
import { Button, Text } from "react-native-paper";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { useRoute } from "@react-navigation/native";
import * as yup from "yup";
import { Formik } from "formik";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { tokenStore } from "../../../../store";
const validationSchema = yup.object().shape({
  email: yup
    .string()

    .label("Email")
    .email("Адрес электронной почты должен быть действительным")
    .required("Введите email"),
});
export const EditProfileForm = ({ navigation }) => {
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");

  const token = tokenStore((state) => state.token);

  const [errorEmail, setErrorEmail] = useState(null);
  const route = useRoute();
  const handleCityChange = (value) => {
    setCity(value);
  };

  const handleSchoolChange = (value) => {
    setSchool(value);
  };

  const handleFacultyChange = (value) => {
    setFaculty(value);
  };

  const handleCourseChange = (value) => {
    setCourse(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handleAboutChange = (value) => {
    setAbout(value);
  };

  const handleSubmit = () => {
    const formData = {
      city: city,
      school: school,
      faculty: faculty,
      course: course,
      email: email,
      about: about,
      first_name: "Piotr",
      last_name: "Makarov",
      email: "piotr.makarov@gmail.com",
      city: "Yekaterinburg",
      bio: "Hello, I'm 18 y.o. React programmer! I love JS and all relaited stuff.",
    };

    console.log(formData);
    // отправка formData на сервер
  };
  function handleExit() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      })
    );
  }
  async function deleteAccount() {
    console.log("Начинаю удаление");
    try {
      const response = await axios.delete(`/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Удалил");
      handleExit();
      console.log("Выхожу на страницу логина");
      console.log(response);
      return response;
    } catch (error) {
      Alert.alert("Не удалось удалить аккаунт");
      console.log(error);
    }
  }
  return (
    <>
      <Formik
        initialValues={{
          email: "",
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
          <View
            style={{
              backgroundColor: COLORS.White,
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,

              marginBottom: -20,
            }}
          >
            {/* <View> */}
            <View style={{ gap: 20 }}>
              <TextInput
                label="Расскажи о себе"
                placeholder="Расскажи о себе"
                value={about}
                onChangeText={handleAboutChange}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                selectionColor={COLORS.Accent}
                style={[
                  GlobalStyles.inputStyles,
                  { height: "auto", textAlign: "auto" },
                ]}
              />
              <TextInput
                label="Email"
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={[GlobalStyles.inputStyles]}
                selectionColor={COLORS.Accent}
              />

              <TextInput
                // label="Город"
                placeholder="Город"
                value={city}
                onChangeText={handleCityChange}
                style={[GlobalStyles.inputStyles]}
                selectionColor={COLORS.Accent}
              />
              <TextInput
                label="Место учебы"
                placeholder="Место учебы"
                value={school}
                onChangeText={handleSchoolChange}
                style={[GlobalStyles.inputStyles]}
                selectionColor={COLORS.Accent}
              />
              <View style={{ flexDirection: "row", gap: 15 }}>
                <TextInput
                  label="Факультет"
                  placeholder="Факультет"
                  value={faculty}
                  onChangeText={handleFacultyChange}
                  style={[GlobalStyles.inputStyles, { flex: 2 }]}
                  selectionColor={COLORS.Accent}
                />
                <TextInput
                  label="Курс"
                  placeholder="Курс"
                  value={course}
                  onChangeText={handleCourseChange}
                  style={[GlobalStyles.inputStyles, { flex: 1 }]}
                  selectionColor={COLORS.Accent}
                />
              </View>
            </View>
            <Button
              title="Submit"
              onPress={() => {
                handleExit();
              }}
              mode="contained-tonal"
              labelStyle={{ color: COLORS.White }}
              // loading={Loading ? true : false}
              style={{ marginTop: 20 }}
              contentStyle={{
                backgroundColor: COLORS.Gray,
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: COLORS.LowRed, ...FONTS.buttonText }}>
                Выйти
              </Text>
            </Button>
            <Button
              title="Submit"
              onPress={() => {
                deleteAccount();
              }}
              mode="contained-tonal"
              labelStyle={{ color: COLORS.White }}
              // loading={Loading ? true : false}
              style={{ marginTop: 20 }}
              contentStyle={{
                backgroundColor: COLORS.LowRed,
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: COLORS.White, ...FONTS.buttonText }}>
                Удалить аккаунт
              </Text>
            </Button>
          </View>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
  },
  textButton: {
    ...FONTS.buttonText,
  },
  errorMessage: {
    marginLeft: 20,
    fontSize: 12,
    fontFamily: "RobotoFlex",

    color: "red",
    marginBottom: -15,
  },
});
