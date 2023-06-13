import {
  StyleSheet,
  Text,
  TouchableHighlightComponent,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native-gesture-handler";
import axios from "axios";

export const InteractionButtons = ({
  id,
  token,

  isSubscribed,
  setIsSubscribed,
  isProfileLoading,
}) => {
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/users/${id}/subscription`,
        {},
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );

      setIsSubscribed(true);
      return response.data.data;
    } catch (error) {
      console.log("Ошибка в подписке к пользователю", error);
    } finally {
      setLoading(false);
    }
  }
  async function unsubscribe() {
    setLoading(true);

    try {
      const response = await axios.delete(`/api/users/${id}/subscription`, {
        headers: { Authorization: `bearer ${token}` },
      });

      // return response.data.data;
      setIsSubscribed(false);
    } catch (error) {
      console.log("Ошибка в отписке от пользователя", error.response.data);
    } finally {
      setLoading(false);
    }
  }
  // console.log(token);

  return (
    <View style={styles.container}>
      <>
        <Button
          onPress={() => (isSubscribed ? unsubscribe() : subscribe())}
          mode="contained-tonal"
          style={styles.firstButton}
          labelStyle={{
            color: COLORS.White,
            // paddingHorizontal: 20,
            // paddingVertical: 10,
          }}
          disabled={loading || isProfileLoading}
        >
          <Text style={styles.firstButtonText}>
            {isSubscribed ? "Отписаться" : "Подписаться"}
          </Text>
        </Button>

        <Button
          onPress={() => console.log("написать сообщение")}
          mode="outlined"
          style={styles.secondButton}
          labelStyle={{ color: COLORS.White, marginHorizontal: 0 }}
        >
          <Text
            style={[
              styles.secondButtonText,
              { flexWrap: "wrap", alignSelf: "stretch" },
            ]}
          >
            Написать сообщение
          </Text>
        </Button>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    gap: 15,
    flexDirection: "row",
    marginTop: 15,
    // marginBottom: 20,
  },
  firstButton: {
    backgroundColor: COLORS.Accent,
    // flex: 1,
    borderRadius: 10,
  },
  secondButton: {
    backgroundColor: "transparent",
    flex: 2,
    // width: "50%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.Accent,
  },
  firstButtonText: {
    color: COLORS.White,
    ...FONTS.buttonText,
  },
  secondButtonText: {
    color: COLORS.Accent,
    ...FONTS.buttonText,

    flex: 1,
  },
});
