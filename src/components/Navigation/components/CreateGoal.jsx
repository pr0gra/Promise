import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import { Checkbox, TouchableRipple } from "react-native-paper";
import { TextComponent } from "react-native";
export const CreateGoal = () => {
  const [about, setAbout] = useState("");
  const [checkedNormal, setCheckedNormal] = useState(true);
  const handleAboutChange = (value) => {
    setAbout(value);
  };
  return (
    <LinearGradient
      colors={["rgba(231, 235, 255, 1)", "rgba(208, 214, 242, 1)"]}
      start={{
        x: 1,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
      style={styles.container}
    >
      <View style={styles.top}>
        <Text style={{ ...FONTS.goalTime, color: COLORS.Accent }}>Хочу к</Text>
        <View
          style={{
            backgroundColor: COLORS.LowAccent,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            marginLeft: 10,
          }}
        >
          <Image
            source={require("../../../../assets/icons/clock.png")}
            style={styles.image}
          />
          <Text style={{ ...FONTS.goalTime, color: COLORS.Accent }}>Пивет</Text>
        </View>
      </View>
      <View>
        <TextInput
          autoFocus={true}
          label="Расскажи о себе"
          placeholder="Расскажи о себе"
          value={about}
          onChangeText={handleAboutChange}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          selectionColor={COLORS.Accent}
          placeholderTextColor={"rgba(145, 155, 204, 0.3)"}
          style={[
            styles.input,
            {
              height: "auto",
              textAlign: "auto",
              ...FONTS.typography,
              color: "rgba(145, 155, 204, 0.5)",
            },
          ]}
        />
      </View>
      <TouchableRipple onPress={() => setCheckedNormal(!checkedNormal)}>
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
      </TouchableRipple>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LowAccent,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
    zIndex: 3,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
    // marginLeft: 12,
  },
  box: {
    width: 200,
    height: 200,
  },
  input: {
    backgroundColor: "transparent",
    maxHeight: 100,
    marginBottom: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
});
