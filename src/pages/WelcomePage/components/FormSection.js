import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { useRoute } from "@react-navigation/native";
export const FormSection = ({ navigation }) => {
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
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
  return (
    <View>
      <ScrollView style={{ maxHeight: 450 }}>
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
          <TextInput
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            style={[GlobalStyles.inputStyles]}
            selectionColor={COLORS.Accent}
          />
        </View>
        {/* </View> */}
      </ScrollView>
      <View style={[styles.buttonContainer, { marginTop: 30 }]}>
        <Button
          style={[
            GlobalStyles.transparentButton,
            styles.button,
            { textAlign: "center" },
          ]}
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
});
