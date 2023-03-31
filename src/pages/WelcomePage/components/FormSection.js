import React, { useState } from "react";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import { COLORS } from "../../../constants/Colors/Colors";

export const FormSection = ({ navigation }) => {
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
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
    };

    console.log(formData);
    // отправка formData на сервер
  };
  return (
    <ScrollView style={{ maxHeight: 550 }}>
      <View>
        <View style={{ gap: 20 }}>
          <TextInput
            label="Расскажи о себе"
            placeholder="Расскажи о себе"
            value={about}
            onChangeText={handleAboutChange}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={[
              GlobalStyles.inputStyles,
              { height: "auto", textAlign: "auto" },
            ]}
          />
          <TextInput
            label="Город"
            placeholder="Город"
            value={city}
            onChangeText={handleCityChange}
            style={[GlobalStyles.inputStyles]}
          />
          <TextInput
            label="Место учебы"
            placeholder="Место учебы"
            value={school}
            onChangeText={handleSchoolChange}
            style={[GlobalStyles.inputStyles]}
          />
          <View style={{ flexDirection: "row", gap: 15 }}>
            <TextInput
              label="Факультет"
              placeholder="Факультет"
              value={faculty}
              onChangeText={handleFacultyChange}
              style={[GlobalStyles.inputStyles, { flex: 2 }]}
            />
            <TextInput
              label="Курс"
              placeholder="Курс"
              value={course}
              onChangeText={handleCourseChange}
              style={[GlobalStyles.inputStyles, { flex: 1 }]}
            />
          </View>
          <TextInput
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            style={[GlobalStyles.inputStyles]}
          />
        </View>

        <View style={[styles.buttonContainer, { marginTop: 30 }]}>
          <Button
            style={[GlobalStyles.transparentButton, styles.button]}
            onPress={() => navigation.goBack()}
            contentStyle={{
              paddingVertical: 10,
            }}
          >
            <Text style={[{ color: COLORS.Accent }, styles.textButton]}>
              Позже
            </Text>
          </Button>
          <Button
            style={[GlobalStyles.boldButton, styles.button, styles.textButton]}
            onPress={handleSubmit}
            mode="tonal"
            contentStyle={{
              paddingVertical: 10,
            }}
          >
            <Text style={[{ color: COLORS.White }, styles.textButton]}>
              Сохранить
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
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
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Roboto-flex",
  },
});