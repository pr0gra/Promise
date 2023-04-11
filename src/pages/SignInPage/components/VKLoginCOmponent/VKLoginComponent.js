import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Linking,
  Text,
} from "react-native";
import axios from "axios";
import * as AuthSession from "expo-auth-session";
import { makeRedirectUri } from "expo-auth-session";
export const VKLoginComponent = () => {
  const [user, setUser] = useState(null);
  async function getUser() {
    axios
      .get(
        "https://test.promise.waika28.ru/api/users/c1e3541f-36fa-430d-b5c0-6962b7216e89"
      )
      .then(function (response) {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => getUser()}>
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
