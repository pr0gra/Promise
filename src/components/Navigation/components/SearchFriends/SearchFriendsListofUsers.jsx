import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../../../constants/Colors/Colors";
import UserAvatar from "react-native-user-avatar";
import { LinearGradient } from "expo-linear-gradient";
export const SearchFriendsListofUsers = ({ listOfUsers, navigation }) => {
  const list = listOfUsers ? (
    listOfUsers?.map((e) => {
      return (
        <TouchableOpacity
          key={e.id}
          onPress={() => navigation.navigate("Profile", { id: e.id })}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              // height: 25,
              marginBottom: 10,
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            <UserAvatar
              style={{ width: 20 }}
              size={20}
              name={`${e.first_name} ${e.last_name}`}
              bgColor={COLORS.Accent}
            />
            <Text>
              {e.first_name} {e.last_name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    })
  ) : (
    <Text>Никого нет</Text>
  );
  return <>{list}</>;
};

const styles = StyleSheet.create({});
