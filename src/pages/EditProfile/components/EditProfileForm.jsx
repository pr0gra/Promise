import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput, Alert } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { useRoute } from "@react-navigation/native";
import * as yup from "yup";
import { Formik } from "formik";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { tokenStore, userInformationStore } from "../../../../store";
import { NavigationEditProfile } from "./NavigationEditProfile";
import { EditProfileImageContainer } from "./EditProfileImageContainer";

const validationSchema = yup.object().shape({
  email: yup
    .string()

    .label("Email")
    .email("Адрес электронной почты должен быть действительным")
    .required("Введите email"),
});
export const EditProfileForm = ({ navigation }) => {
  const userData = userInformationStore((state) => state.userInformation);
  const setUserData = userInformationStore((state) => state.setUserInformation);

  const [city, setCity] = useState(userData.city);
  const [school, setSchool] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState(userData.email);
  const [about, setAbout] = useState(userData.bio);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const token = tokenStore((state) => state.token);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCityChange = (value) => {
    setCity(value);
  };
  const handleNameChange = (value) => {
    setName(value);

    setFirstName(
      value.split(" ")[0] == "" ? userData.first_name : value.split(" ")[0]
    );

    setLastName(
      value.split(" ")[1] !== undefined && value.split(" ")[1] !== ""
        ? value.split(" ")[1]
        : userData.last_name
    );
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

  const handleAboutChange = (value) => {
    setAbout(value);
  };

  const handleSubmitForm = async () => {
    const user = {
      school: school,
      faculty: faculty,
      course: course,
      email: email == undefined ? userData.email.trim() : email.trim(),
      first_name: firstName,
      last_name: lastName,
      city: city,
      bio: about,
      id: userData.id,
    };
    try {
      setErrors(null);
      const response = await axios.put(
        `/api/profile`,
        {
          user: {
            ...user,
          },
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );

      setUserData(user);
      console.log(response.status, "Успешно изменил данные о пользователе");
      return response;
    } catch (error) {
      console.log("Ошибка в отправке формы", error.response.data.errors);
      setErrors(error.response.data.errors);

      // throw new Error("Ошибка в отправке формы");
    } finally {
      setLoading(false);
    }
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

      return response;
    } catch (error) {
      Alert.alert("Не удалось удалить аккаунт");
      console.log(error);
    }
  }
  return (
    <>
      <ScrollView>
        <View style={{ marginBottom: 20, flexDirection: "column", gap: 20 }}>
          <NavigationEditProfile navigation={navigation} />
          <EditProfileImageContainer
            handleNameChange={handleNameChange}
            name={name}
          />
        </View>
        <View
          style={{
            backgroundColor: COLORS.White,
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

            marginBottom: -20,
          }}
        >
          <View style={{ gap: 20 }}>
            <TextInput
              label="Расскажи о себе"
              placeholder="Расскажи о себе"
              value={about == null ? "" : about}
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
            {errors?.bio && (
              <Text style={{ color: COLORS.Red, marginTop: -20 }}>
                {errors.bio}
              </Text>
            )}
            <TextInput
              label={userData.email}
              placeholder={userData.email}
              value={email}
              onChangeText={(e) => {
                setEmail(e);
              }}
              style={[GlobalStyles.inputStyles]}
              selectionColor={COLORS.Accent}
            />
            {errors?.email && (
              <Text style={{ color: COLORS.Red, marginTop: -20 }}>
                {errors.email}
              </Text>
            )}
            <TextInput
              placeholder="Город"
              value={city == null ? userData.city : city}
              onChangeText={handleCityChange}
              style={[GlobalStyles.inputStyles]}
              selectionColor={COLORS.Accent}
            />
            {errors?.city &&
              errors?.city?.map((e, index) => {
                return (
                  <Text
                    key={index}
                    style={{ color: COLORS.Red, marginTop: -20 }}
                  >
                    {e}
                  </Text>
                );
              })}
            <TextInput
              label="Место учебы"
              placeholder="Место учебы"
              value={school == null ? userData.school : school}
              onChangeText={handleSchoolChange}
              style={[GlobalStyles.inputStyles]}
              selectionColor={COLORS.Accent}
            />
            {errors?.school && (
              <Text style={{ color: COLORS.Red, marginTop: -20 }}>
                {errors.school}
              </Text>
            )}
            <View style={{ flexDirection: "row", gap: 15 }}>
              <TextInput
                label="Факультет"
                placeholder="Факультет"
                value={faculty == null ? userData.faculty : faculty}
                onChangeText={handleFacultyChange}
                style={[GlobalStyles.inputStyles, { flex: 2 }]}
                selectionColor={COLORS.Accent}
              />
              {errors?.faculty && (
                <Text style={{ color: COLORS.Red, marginTop: -20 }}>
                  {errors.faculty}
                </Text>
              )}
              <TextInput
                label="Курс"
                placeholder="Курс"
                value={course == null ? userData.course : course}
                onChangeText={handleCourseChange}
                style={[GlobalStyles.inputStyles, { flex: 1 }]}
                selectionColor={COLORS.Accent}
              />
              {errors?.course && (
                <Text style={{ color: COLORS.Red, marginTop: -20 }}>
                  {errors.course}
                </Text>
              )}
            </View>
          </View>
          <Button
            title="Submit"
            onPress={() => {
              handleExit();
            }}
            mode="contained-tonal"
            labelStyle={{ color: COLORS.White }}
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
      </ScrollView>
      <View
        style={{
          backgroundColor: COLORS.White,
          padding: 20,
          flexDirection: "row",
          gap: 15,
          alignItems: "center",
        }}
      >
        <IconButton
          onPress={() => {
            navigation.navigate("Profile", { id: userData.id });
          }}
          size={24}
          mode="contained"
          style={[
            {
              backgroundColor: "rgba(233, 233, 233, 1)",
              flex: 1,
              height: 58,
            },
          ]}
          iconColor={COLORS.Accent}
          icon={require("../../../../assets/icons/eye.png")}
        />

        <Button
          title="Submit"
          onPress={() => {
            handleSubmitForm();
          }}
          mode="contained-tonal"
          style={[{ flex: 2 }]}
          labelStyle={{ color: COLORS.White }}
          contentStyle={{
            backgroundColor: COLORS.Accent,
            paddingVertical: 10,
          }}
          loading={loading}
        >
          <Text style={{ color: COLORS.White, ...FONTS.buttonText }}>
            Сохранить
          </Text>
        </Button>
      </View>
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
