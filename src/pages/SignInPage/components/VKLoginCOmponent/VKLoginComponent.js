import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Linking,
} from "react-native";

import * as WebBrowser from "expo-web-browser";
import { VK } from "react-native-vkontakte-login";

export const VKLoginComponent = () => {
  //   const [loggedIn, setLoggedIn] = useState(false);

  //   const vkAuth = async () => {
  //     try {
  //       const { accessToken, userId } = await VK.login(["email"]);

  //       console.log(
  //         `AccessToken: ${accessToken}, UserId: ${userId}`,
  //         "FFFFFFFFFFFFFF"
  //       );

  //       setLoggedIn(true);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const handleAuthPress = async () => {
  //     await WebBrowser.openBrowserAsync(
  //       "https://oauth.vk.com/authorize?client_id=51600354&redirect_uri=myapp://&display=mobile&scope=email&response_type=token"
  //     );
  //     VK.initialize(51600354);
  //     vkAuth();
  //   };
  const [loggedIn, setLoggedIn] = useState(false);

  const vkAuth = async () => {
    try {
      const { accessToken, userId } = await VK.login(["email"]);

      console.log(`AccessToken: ${accessToken}, UserId: ${userId}`);

      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuthPress = async () => {
    await WebBrowser.openBrowserAsync(
      "https://oauth.vk.com/authorize?client_id=51600354&redirect_uri=exp://192.168.100.2:19000&display=mobile&scope=email&response_type=token"
    );
    VK.initialize(51600354);
  };

  useEffect(() => {
    const handleUrl = async ({ url }) => {
      if (url.startsWith("https://oauth.vk.com/")) {
        await WebBrowser.dismissBrowser();
        VK.setAccessToken(url.split("=")[1]); // устанавливаем токен доступа в библиотеке VK
        vkAuth(); // вызываем метод для авторизации ВКонтакте
      }
    };

    Linking.addEventListener("url", handleUrl);

    return () => {
      Linking.removeEventListener("url", handleUrl);
    };
  }, []);
  return (
    <View style={styles.container}>
      {loggedIn ? (
        <View>
          {/* <SocialIcon title="VKontakte (Logged In)" button type="vk" /> */}
          <Image
            source={require("../../../../../assets/icons/VK.png")}
            style={styles.image}
          />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={handleAuthPress}>
          <Image
            source={require("../../../../../assets/icons/VK.png")}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: 25, height: 25 },
});
