import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../../../constants/Colors/Colors";

export const SearchFriendsListofUsers = ({ listOfUsers, navigation }) => {
  const test = listOfUsers ? (
    listOfUsers?.map((e) => {
      return (
        <TouchableOpacity
          key={e.id}
          onPress={() => navigation.navigate("Profile", { id: e.id })}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              // height: 25,
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
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
  return (
    // <ScrollView
    //   showsVerticalScrollIndicator={true}
    //   contentContainerStyle={{ gap: 20 }}
    // >
    <>
      {listOfUsers ? (
        listOfUsers?.map((e) => {
          return (
            <TouchableOpacity
              key={e.id}
              onPress={() => navigation.navigate("Profile", { id: e.id })}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  // height: 25,
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: "white",
                  borderRadius: 20,
                }}
              >
                <Text>
                  {e.first_name} {e.last_name}
                </Text>
              </View>
              <View
                style={{ height: 10, backgroundColor: COLORS.LowAccent }}
              ></View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>Никого нет</Text>
      )}
    </>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({});
