import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import { COLORS } from "../../../../constants/Colors/Colors";
import { FONTS } from "../../../../constants/FONTS/FONTS";
import { SearchFriendsListofUsers } from "./SearchFriendsListofUsers";
import { tokenStore } from "../../../../../store";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

export const SearchFriends = ({ isVisible, setIsVisible, navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const token = tokenStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  async function getListOfUsers(title) {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/users?name=${title}`,

        {
          headers: { Authorization: `bearer ${token}` },
        }
      );

      setListOfUsers(response.data.data);

      return response.data;
    } catch (error) {
      console.log("Ошибка в получении списка пользователей", error);

      // throw new Error("Ошибка в получении списка пользователей");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flexDirection: "column", gap: 20 }}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <TextInput
          label="Введите имя"
          placeholder="Введите имя"
          value={title}
          onChangeText={(e) => {
            setTitle(e);
          }}
          textAlignVertical="top"
          // selectionColor={COLORS.LowAccent}
          placeholderTextColor={"rgba(145, 155, 204, 0.7)"}
          style={[
            styles.input,
            {
              width: windowWidth - 100,
              textAlign: "auto",
              ...FONTS.typography,
              color: "rgba(145, 155, 204, 0.7)",
              maxHeight: 100,
            },
          ]}
        />
        <IconButton
          icon={require("../../../../../assets/icons/lupa.png")}
          size={24}
          onPress={() => {
            getListOfUsers(title);
          }}
          iconColor={COLORS.Accent}
        />
      </View>
      {listOfUsers.length !== 0 && (
        <LinearGradient
          colors={["rgba(0,0, 0, 0)", "#E6EAFE"]}
          start={{
            x: 1,
            y: 1,
          }}
          end={{
            x: 1,
            y: 0,
          }}
          style={{ height: 10, marginBottom: -30, zIndex: 100 }}
        ></LinearGradient>
      )}
      <ScrollView
        style={{ maxHeight: 300 }}
        contentContainerStyle={{
          // backgroundColor: COLORS.LowAccent,
          gap: 20,
          paddingHorizontal: 5,
          paddingVertical: 5,
          borderRadius: 20,
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)"]}
          start={{
            x: 1,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={{ borderRadius: 20 }}
        >
          <SearchFriendsListofUsers
            listOfUsers={listOfUsers}
            navigation={navigation}
          />
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
