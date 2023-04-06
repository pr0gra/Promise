import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Linking,
} from "react-native";

import * as AuthSession from "expo-auth-session";
import { makeRedirectUri } from "expo-auth-session";
export const VKLoginComponent = () => {
  const [test, setTest] = useState("");
  const vkAuthConfig = {
    issuer: "https://oauth.vk.com",
    clientId: "51600354",
    scopes: ["wall"],
    /* токен безопасности можно сгенерировать через:
      https://randus.org/generators/access_token_vk/ */
    redirectUrl:
      "https://oauth.vk.com/blank.html#access_token=G0Uc7SixtXMOyRIgLiOh&expires_in=0&user_id=51600354",
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: vkAuthConfig.clientId,
      scopes: vkAuthConfig.scopes,
      redirectUri: makeRedirectUri(),
    },
    vkAuthConfig
  );

  useEffect(() => {
    if (response?.type === "success") {
      const responseUrl = response.params.url;
      const accessToken = responseUrl.match(/access_token=(.*?)&/)[1];
      // используйте полученный токен для получения данных о пользователе
      try {
        fetch(
          `https://api.vk.com/method/users.get?v=5.92&access_token=${accessToken}`
        )
          .then((response) => response.json())
          .then((json) => setTest(json.response[0].first_name))
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => promptAsync()}>
        <Image
          source={require("../../../../../assets/icons/VK.png")}
          style={styles.image}
        />
      </TouchableWithoutFeedback>
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
//  "https://oauth.vk.com/authorize?client_id=51600354&redirect_uri=https://auth.expo.io/@company/Promise&display=mobile&scope=wall&response_type=token"
