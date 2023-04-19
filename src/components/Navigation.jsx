import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors/Colors";
import { useRoute } from "@react-navigation/native";
import { Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import {
  Surface,
  IconButton,
  Menu,
  Divider,
  Provider,
} from "react-native-paper";
export const Navigation = ({ navigation }) => {
  const route = useRoute();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuTop, setMenuTop] = useState(70);
  const openMenu = () => {
    setIsMenuVisible(true);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <>
      <Provider>
        <Menu
          visible={isMenuVisible} // устанавливаем видимость меню
          onDismiss={closeMenu} // функция, вызываемая при закрытии меню
          anchorPosition={{ top: menuTop, left: 0 }}
          anchor={<Provider></Provider>}
        >
          <Menu.Item onPress={() => {}} title="Пункт 1" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Пункт 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Пункт 3" />
        </Menu>
      </Provider>

      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("MyGoals")}
        >
          <View style={styles.buttonContainer}>
            <View
              style={
                route.name == "MyGoals" && !isMenuVisible && styles.paramsStyle
              }
            >
              <Image
                source={require("../../assets/icons/target-04.png")}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  color: COLORS.Accent,
                  marginTop: route.name == "MyGoals" ? 4 : 8,
                },
              ]}
            >
              Мои цели
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Advices")}
        >
          <View style={styles.buttonContainer}>
            <View
              style={
                route.name == "Advices" && !isMenuVisible && styles.paramsStyle
              }
            >
              <Image
                source={require("../../assets/icons/rows-01.png")}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  color: COLORS.Accent,
                  marginTop: route.name == "Advices" && !isMenuVisible ? 4 : 8,
                },
              ]}
            >
              Лента
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <Surface
          style={[styles.surface]}
          elevation={3}
          shadowColor={"rgba(145, 155, 204, 0.3)"}
        >
          <IconButton
            onPress={() => {
              console.log(123);
            }}
            size={30}
            mode="contained"
            style={[styles.button]}
            iconColor={COLORS.LowAccent}
            icon={require("../../assets/icons/plus.png")}
          />
        </Surface>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Chats")}>
          <View style={styles.buttonContainer}>
            <View
              style={
                route.name == "Chats" && !isMenuVisible && styles.paramsStyle
              }
            >
              <Image
                source={require("../../assets/icons/message-square-01.png")}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  color: COLORS.Accent,
                  marginTop: route.name == "Chats" && !isMenuVisible ? 4 : 8,
                },
              ]}
            >
              Чаты
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => setIsMenuVisible((state) => !state)}
        >
          <View style={styles.buttonContainer}>
            <View style={isMenuVisible && styles.paramsStyle}>
              <Image
                source={require("../../assets/icons/menu-01.png")}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  color: COLORS.Accent,
                  marginTop: isMenuVisible ? 4 : 8,
                },
              ]}
            >
              Меню
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LowAccent,
    height: 72,

    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 17,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttonContainer: {
    alignItems: "center",
    // justifyContent: "center",
    width: 51,
  },
  image: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: COLORS.Accent,
    marginTop: -17,
    borderRadius: 30,
    width: 70,
    height: 70,
  },
  text: { fontWeight: "600", fontSize: 10 },
  paramsStyle: {
    backgroundColor: "rgba(145, 155, 204, 0.3)",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 100,
  },
  surface: {
    shadowColor: "rgba(0, 0, 0, 0.30)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "transparent",
    flex: 1,
    height: 70,

    borderRadius: 30,
  },
});
