import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/Colors/Colors";
import { useRoute } from "@react-navigation/native";
import { Image, Animated } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import {
  Surface,
  IconButton,
  Menu,
  Divider,
  Provider,
} from "react-native-paper";

import { MenuNavigation } from "./components/MenuNavigation";
import { CreateGoal } from "./components/CreateGoal";
import axios from "axios";
import { tokenStore } from "../../../store";

import { set } from "react-native-reanimated";
import { Platform } from "react-native";
export const Navigation = ({ navigation, handleRefresh }) => {
  const route = useRoute();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [stateNavigation, setStateNavigation] = useState("");
  const token = tokenStore((state) => state.token);
  const [userData, setUserData] = useState(null);
  const widthSize = useRef(new Animated.Value(70)).current;
  const leftPosition = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get("window").width;
  const [isGoalVisible, setIsGoalVisible] = useState(false);

  const expand = () => {
    Animated.timing(widthSize, {
      toValue: windowWidth - 30,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const noExpand = () => {
    Animated.timing(widthSize, {
      toValue: 70,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const getUserInfo = useMemo(
    () =>
      async function getUserInfo() {
        try {
          const response = await axios.get("/api/profile", {
            headers: { Authorization: `bearer ${token}` },
          });

          setUserData(JSON.stringify(response.data.data));
          return response.data.data;
        } catch (error) {
          console.log(error);
        }
      },
    [userData]
  );
  // const shadowStyle =
  //   Platform.OS === "android"
  //     ? {
  //         elevation: 4,
  //         shadowColor: "rgba(0, 0, 0, 0.30)",
  //       }
  //     : {
  //         shadowColor: "#000",
  //         shadowOffset: { width: 0, height: 11 },
  //         shadowOpacity: 0.15,
  //         shadowRadius: 32,
  //       };
  return (
    <>
      {isMenuVisible && (
        <MenuNavigation
          userData={userData}
          navigation={navigation}
          isMenuVisible={isMenuVisible}
          setIsMenuVisible={setIsMenuVisible}
          noExpand={noExpand}
        />
      )}
      {isGoalVisible && (
        <CreateGoal
          isGoalVisible={isGoalVisible}
          setIsGoalVisible={setIsGoalVisible}
          noExpand={noExpand}
          expand={expand}
          handleRefresh={handleRefresh}
        />
      )}

      <View style={styles.container}>
        {!isGoalVisible && (
          <TouchableWithoutFeedback
            onPress={() => {
              setIsMenuVisible(false);
              navigation.navigate("MyGoals");
            }}
          >
            <View style={styles.buttonContainer}>
              <View
                style={
                  route.name == "MyGoals" &&
                  !isMenuVisible &&
                  styles.paramsStyle
                }
              >
                <Image
                  source={require("../../../assets/icons/target-04.png")}
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
        )}

        {!isGoalVisible && (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Advices")}
          >
            <View style={styles.buttonContainer}>
              <View
                style={
                  route.name == "Advices" &&
                  !isMenuVisible &&
                  styles.paramsStyle
                }
              >
                <Image
                  source={require("../../../assets/icons/rows-01.png")}
                  style={styles.image}
                />
              </View>
              <Text
                style={[
                  styles.text,
                  {
                    color: COLORS.Accent,
                    marginTop:
                      route.name == "Advices" && !isMenuVisible ? 4 : 8,
                  },
                ]}
              >
                Лента
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}

        {/* <Surface style={[styles.surface, shadowStyle]}> */}
        <Animated.View
          style={{
            alignTimes: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <IconButton
            onPress={() => {
              setStateNavigation("CreateGoal");
              setIsGoalVisible(true);
              expand();
              setIsMenuVisible(false);
            }}
            size={30}
            mode="contained"
            style={[
              styles.button,
              {
                width: widthSize,
                left: leftPosition,
              },
            ]}
            iconColor={COLORS.LowAccent}
            icon={require("../../../assets/icons/plus.png")}
          />
        </Animated.View>
        {/* </Surface> */}

        {!isGoalVisible && (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Chats")}
          >
            <View style={styles.buttonContainer}>
              <View
                style={
                  route.name == "Chats" && !isMenuVisible && styles.paramsStyle
                }
              >
                <Image
                  source={require("../../../assets/icons/message-square-01.png")}
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
        )}
        {!isGoalVisible && (
          <TouchableWithoutFeedback
            onPress={() => {
              setStateNavigation("Menu");
              getUserInfo();
              setIsMenuVisible((state) => !state);
            }}
          >
            <View style={styles.buttonContainer}>
              <View style={isMenuVisible && styles.paramsStyle}>
                <Image
                  source={require("../../../assets/icons/menu-01.png")}
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
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LowAccent,
    height: 72,

    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 17,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    zIndex: 10,
  },
  buttonContainer: {
    alignItems: "center",
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
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 15 },
    shadowRadius: 4,
    backgroundColor: "transparent",
    flex: 1,

    borderRadius: 30,
  },
  menuContainer: {
    position: "absolute",
    bottom: 71,
    zIndex: 5,
    backgroundColor: COLORS.LowAccent,
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 36,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  avatarContainer: {
    width: "100%",
    marginBottom: 22,
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
  },
});
