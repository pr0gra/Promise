import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from "react-native";

import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import {
  Checkbox,
  Dialog,
  IconButton,
  Portal,
  Surface,
  TouchableRipple,
} from "react-native-paper";
import { TextComponent } from "react-native";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";

export const CreateGoal = ({ setIsGoalVisible, isGoalVisible, noExpand }) => {
  const [about, setAbout] = useState("");
  const [checkedNormal, setCheckedNormal] = useState(true);
  const handleAboutChange = (value) => {
    setAbout(value);
  };
  // const windowWidth = Dimensions.get("window").width;
  // const widthSize = useRef(new Animated.Value(70)).current;
  // const leftPosition = useRef(new Animated.Value(0)).current;
  // const expand = () => {
  //   Animated.timing(widthSize, {
  //     toValue: windowWidth - 30,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start();
  // };
  // useEffect(() => {
  //   expand();
  // }, []);
  // const noExpand = () => {
  //   Animated.timing(widthSize, {
  //     toValue: 70,
  //     duration: 200,
  //     useNativeDriver: false,
  //   }).start();
  // };

  return (
    <Portal>
      <Dialog
        visible={isGoalVisible}
        onDismiss={() => {
          setIsGoalVisible(false);
          noExpand();
        }}
        style={{
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          position: "absolute",
          bottom: 0,

          width: "100%",
        }}
      >
        <Dialog.Content
          style={{
            paddingHorizontal: 0,
            marginTop: 0,
            paddingBottom: 0,
          }}
        >
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
            <View
              style={{
                width: 50,
                height: 4,
                backgroundColor: COLORS.Accent,
                left: "50%",
                marginLeft: -25,
                borderRadius: 100,
                marginBottom: 20,
              }}
            ></View>
            <View style={styles.top}>
              <Text style={{ ...FONTS.goalTime, color: COLORS.Accent }}>
                Хочу к
              </Text>
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
                <Text style={{ ...FONTS.goalTime, color: COLORS.Accent }}>
                  Пивет
                </Text>
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
                    color: "rgba(145, 155, 204, 0.7)",
                  },
                ]}
              />
            </View>
            <TouchableWithoutFeedback
              onPress={() => setCheckedNormal((state) => !state)}
              style={{ height: 50 }}
            >
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
            </TouchableWithoutFeedback>
            <Surface
              style={[styles.surface]}
              elevation={3}
              shadowColor={"rgba(145, 155, 204, 0.3)"}
              shadowOpacity={1}
            >
              <Animated.View
                style={{
                  alignTimes: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onPress={() => {}}
                  size={30}
                  mode="contained"
                  style={[styles.button]}
                  iconColor={COLORS.LowAccent}
                  icon={require("../../../../assets/icons/plus.png")}
                />
              </Animated.View>
            </Surface>
          </LinearGradient>
        </Dialog.Content>
      </Dialog>
    </Portal>
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
    marginBottom: 36,
  },
  button: {
    backgroundColor: COLORS.Accent,
    marginTop: -11,
    borderRadius: 30,
    width: "100%",
    marginHorizontal: 15,
    height: 70,
  },
  surface: {
    shadowColor: "rgba(0, 0, 0, 0.30)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    backgroundColor: "transparent",
    flex: 1,
    height: 70,
    marginBottom: -11,
    borderRadius: 30,
  },
});
