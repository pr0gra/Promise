import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { COLORS } from "../../constants/Colors/Colors";
// import { MiniButtonNavigation } from "./Components/MiniButtonNavigation";
import { MiniButtonNavigation } from "./components/MiniButtonNavigation.jsx";
import imageTarget from "../../../assets/icons/target-04.png";
import imageRows from "../../../assets/icons/rows-01.png";
import imageMessageSquare from "../../../assets/icons/message-square-01.png";
import imageMenu from "../../../assets/icons/menu-01.png";
import { MenuComponent } from "./components/MenuComponent.jsx";
import { SlideUpContainer } from "../SlideUpContainer/SlideUpContainer.jsx";
import { IconButton } from "react-native-paper";
import { Animated } from "react-native";
import { useRoute } from "@react-navigation/native";
import { CreateGoalComponent } from "./components/CreateGoalComponent.jsx";
import axios from "axios";
import { goalJoins, tokenStore } from "../../../store";
import { SearchFriends } from "./components/SearchFriends/SearchFriends.jsx";
import { ListOfJoinsOfGoal } from "./components/ListOfJoinsOfGoal/ListOfJoinsOfGoal.jsx";
import { NavigationContext } from "../../../NavigationContext.jsx";

export const Navigation = memo(({ navigation, handleRefresh = () => {} }) => {
  const route = useRoute();

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isGoalVisible, setIsGoalVisible] = useState(false);

  const [checked, setChecked] = useState(true);
  const [title, setTitle] = useState("");
  const widthSize = useRef(new Animated.Value(70)).current;
  const windowWidth = Dimensions.get("window").width;
  const token = tokenStore((state) => state.token);
  const [posted, setPosted] = useState(false);
  const [selected, setSelected] = useState("");
  const [errorLengthOfTitle, setErrorLengthOfTitle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [isFriendsVisible, setIsFriendsVisible] = useState(false);
  const expand = () => {
    Animated.timing(widthSize, {
      toValue: windowWidth - 30,
      duration: 200,
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
  useEffect(() => {
    if (!isGoalVisible) {
      noExpand();
    }
  }, [isGoalVisible]);
  function getFormattedDate(tomorrow = 0) {
    const today = new Date();
    const year = today.getFullYear();

    let month = today.getMonth() + 1;
    let day = today.getDate() + tomorrow;

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    const formattedToday = year + "-" + month + "-" + day;

    return formattedToday;
  }

  async function createGoal() {
    setErrorLengthOfTitle(false);
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/goals",

        {
          goal: {
            title: title.trim(),
            deadline: selected
              ? selected + "T23:59"
              : getFormattedDate(1) + "T23:59",
            is_public: checked,
          },
        },
        { headers: { Authorization: `bearer ${token}` } }
      );
      setIsGoalVisible(false);
      console.log("Отправлено");
      setPosted(true);
      setDateError(false);
      setErrorLengthOfTitle(false);
      setTitle("");
      handleRefresh();
      return response.data;
    } catch (error) {
      setDateError(true);
      console.log(
        "Не удалось создать цель, ошибка: ",
        error.response.data.errors.deadline[0]
      );

      return error;
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setPosted(false);
    }, 2000);
  }, [posted]);
  const { isShowJoins, setIsShowJoins } = useContext(NavigationContext);
  return (
    <>
      <SlideUpContainer
        isVisible={isMenuVisible}
        setIsVisible={setIsMenuVisible}
      >
        <MenuComponent
          setIsMenuVisible={setIsMenuVisible}
          isMenuVisible={isMenuVisible}
          navigation={navigation}
          setIsFriendsVisible={setIsFriendsVisible}
        />
      </SlideUpContainer>
      <SlideUpContainer
        isVisible={isFriendsVisible}
        setIsVisible={setIsFriendsVisible}
      >
        <SearchFriends
          isVisible={isFriendsVisible}
          setIsVisible={setIsFriendsVisible}
          navigation={navigation}
        />
      </SlideUpContainer>
      <SlideUpContainer isVisible={isShowJoins} setIsVisible={setIsShowJoins}>
        <ListOfJoinsOfGoal
          isVisible={isShowJoins}
          setIsVisible={setIsShowJoins}
          navigation={navigation}
        />
      </SlideUpContainer>
      <SlideUpContainer
        isVisible={isGoalVisible}
        setIsVisible={setIsGoalVisible}
      >
        <CreateGoalComponent
          checked={checked}
          setChecked={setChecked}
          title={title}
          setTitle={setTitle}
          selected={selected}
          setSelected={setSelected}
          errorLengthOfTitle={errorLengthOfTitle}
          dateError={dateError}
        />
      </SlideUpContainer>
      <View style={styles.container}>
        {!isGoalVisible && (
          <TouchableOpacity
            onPress={() => {
              setIsMenuVisible(false);
              setIsShowJoins(false);
              navigation.navigate("MyGoals");
            }}
          >
            <MiniButtonNavigation
              image={imageTarget}
              text={"Мои цели"}
              selected={route.name == "MyGoals" && !isMenuVisible}
              marginTop={route.name !== "MyGoals"}
              styleText={{
                fontWeight: "600",
                fontSize: 10,
                color: COLORS.Accent,
              }}
            />
          </TouchableOpacity>
        )}
        {!isGoalVisible && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NewsTape");
              setIsShowJoins(false);
            }}
          >
            <View style={[styles.miniButton, {}]}>
              <MiniButtonNavigation
                image={imageRows}
                text={"Лента"}
                marginTop={route.name !== "NewsTape"}
                selected={route.name == "NewsTape" && !isMenuVisible}
                styleText={{
                  fontWeight: "600",
                  fontSize: 10,
                  color: COLORS.Accent,
                }}
              />
            </View>
          </TouchableOpacity>
        )}

        <Animated.View
          style={{
            width: widthSize,
          }}
        >
          <IconButton
            onPress={() => {
              setIsGoalVisible(true);
              setIsMenuVisible(false);
              setIsShowJoins(false);
              expand();
              if (isGoalVisible) {
                if (title.trim().length > 7) {
                  createGoal();
                } else {
                  setErrorLengthOfTitle(true);
                }
              }
            }}
            size={30}
            mode="contained"
            style={[
              {
                backgroundColor: COLORS.Accent,
                marginTop: -17,
                borderRadius: 30,
                height: 70,
                zIndex: 5,
                minWidth: 70,
                width: "100%",
                marginLeft: -1,
              },
            ]}
            labelStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
            iconColor={COLORS.LowAccent}
            icon={
              // require("../../../assets/icons/plus.png")
              posted
                ? require("../../../assets/icons/check.png")
                : require("../../../assets/icons/plus.png")
            }
            disabled={loading}
          />
        </Animated.View>

        {!isGoalVisible && (
          <TouchableOpacity
            onPress={() => {
              setIsShowJoins(false);
            }}
          >
            <MiniButtonNavigation
              image={imageMessageSquare}
              text={"Чаты"}
              marginTop={route.name !== "Chats"}
              selected={route.name == "Chats" && !isMenuVisible}
              styleText={{
                fontWeight: "600",
                fontSize: 10,
                color: COLORS.Accent,
              }}
            />
          </TouchableOpacity>
        )}
        {!isGoalVisible && (
          <TouchableOpacity
            onPress={() => {
              setIsMenuVisible((state) => !state);
              setIsFriendsVisible(false);
              setIsShowJoins(false);
            }}
          >
            <MiniButtonNavigation
              image={imageMenu}
              text={"Меню"}
              marginTop={!isMenuVisible}
              selected={isMenuVisible}
              styleText={{
                fontWeight: "600",
                fontSize: 10,
                color: COLORS.Accent,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
});

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
  miniButton: {
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
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
