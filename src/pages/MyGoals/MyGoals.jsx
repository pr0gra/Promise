import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { FONTS } from "../../constants/FONTS/FONTS";
import { Goal } from "./components/Goal.jsx";
import axios from "axios";
import { tokenStore, userInformationStore } from "../../../store.js";
import { FlatList } from "react-native";
import { Navigation } from "../../components/Navigation/Navigation";
import SkeletonLoading from "../../components/SkeletonLoading/SkeletonLoading";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { SendEveryDayPushNotification } from "../../constants/Functions/SendEveryDayPushNotification";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {AsyncStorage} from 'react-native';

export const MyGoals = ({ navigation }) => {
  const [Loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [goals, setGoals] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState({});
  const token = tokenStore((state) => state.token);
  const notificationListener = useRef();
  const responseListener = useRef();

  const setUserInformation = userInformationStore(
    (state) => state.setUserInformation
  );
  useFocusEffect(
    //Этаа функция для обновления списка после удалкения цели
    useCallback(() => {
      handleRefresh();
    }, [])
  );

  const handleRefresh = () => {
    getGoals();
  };
  async function getGoals() {
    setLoading(true);

    try {
      const response = await axios.get(`/api/goals`, {
        headers: { Authorization: `bearer ${token}` },
      });
      const sortedData = response.data.data.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );

      setGoals(sortedData);

      return response.data.data;
    } catch (error) {
      console.log("Ошибка в получении целей", error.response);
      setErrorState(error.response.status);

      // throw new Error("Ошибка в получении целей");
    } finally {
      setLoading(false);
    }
  }
  async function getUserInfo() {
    try {
      const response = await axios.get(`/api/profile`, {
        headers: { Authorization: `bearer ${token}` },
      });

      setUserInformation(response.data.data);
    } catch (error) {
      console.log("Ошибка в получении пользователя", error);

      // throw new Error("Ошибка в получении пользователя");
    }
  }
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    getGoals();
    getUserInfo();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    SendEveryDayPushNotification(expoPushToken).then((data) => {
      console.log(data);
    });
  }, [expoPushToken]);

  // storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem(
  //       'everyDayNotificationMessage',
  //       notificationMessage,
  //     );
  //   } catch (error) {
  //     console.log(error, "У нас проблемы")
  //   }
  // };
  // storeData()
  

  // Notifications code
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  return (
    <View
      style={{
        paddingTop: 32,
        backgroundColor: COLORS.Background,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: 20,
        }}
      >
        <Text
          style={[
            GlobalStyles.pageTitle,
            { marginLeft: 20, marginTop: 20, marginBottom: 20 },
          ]}
        >
          Мои цели
        </Text>
        {/* <IconButton
          iconColor={COLORS.Accent}
          icon={require("../../../assets/icons/bell-01.png")}
          onPress={() => navigation.navigate("NotificationsPage")}
        /> */}
      </View>
      {goals.length === 0 && Loading ? (
        <ScrollView>
          <SkeletonLoading
            width="100%"
            height={120}
            borderRadius={20}
            marginBottom={10}
            repeat={4}
          />
        </ScrollView>
      ) : goals.length === 0 && !Loading ? (
        <Text
          style={{
            ...FONTS.goalTime,
            color: COLORS.Accent,
            flex: 1,
            marginLeft: 20,
          }}
        >
          Нет целей
        </Text>
      ) : (
        <FlatList
          data={goals}
          renderItem={({ item }) => (
            <Goal
              title={item.title}
              id={item.id}
              user_id={item.user_id}
              deadline={item.deadline}
              navigation={navigation}
              startDate={item.inserted_at}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          indicatorStyle={COLORS.Accent}
          refreshControl={
            <RefreshControl
              refreshing={Loading}
              onRefresh={handleRefresh}
              colors={[COLORS.Accent]}
            />
          }
        />
      )}

      <Navigation
        navigation={navigation}
        setLoading={setLoading}
        handleRefresh={handleRefresh}
      />
    </View>
  );
};
