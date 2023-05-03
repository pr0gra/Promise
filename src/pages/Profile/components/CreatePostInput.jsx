import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import UserAvatar from "react-native-user-avatar";
import axios from "axios";
export const CreatePostInput = ({
  handleRefresh,
  goalId,
  token,
  firstName,
  lastName,
}) => {
  const [inputText, setInputText] = useState("");
  async function createPost(inputText, goalId) {
    try {
      const response = await axios.post(
        `/api/goals/${goalId}/posts`,
        {
          post: { text: inputText },
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log("NO RESPONSE");
      }
      throw new Error("Ошибка в создании Поста");
    }
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.White,
        borderRadius: 20,
        marginLeft: 20,
        flexDirection: "row",
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 60,
        // marginTop: 10,
        paddingVertical: 5,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <UserAvatar
          style={{ width: 20, height: 20 }}
          size={25}
          name={`${firstName} ${lastName}`}
          bgColor={COLORS.Accent}
        />
        <TextInput
          multiline={true}
          style={{ flex: 1 }}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Написать..."
        />
      </View>

      <IconButton
        mode="contained"
        onPress={() => {
          createPost(inputText, goalId);
          handleRefresh();
          setInputText("");
        }}
        icon={require("../../../../assets/icons/send-02.png")}
        iconColor={COLORS.Accent}
        style={{ backgroundColor: "transparent" }}
        disabled={!inputText.trim()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
