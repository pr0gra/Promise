import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { EditProfileForm } from "./components/EditProfileForm";
import { COLORS } from "../../constants/Colors/Colors";
import { Button, IconButton } from "react-native-paper";
import { FONTS } from "../../constants/FONTS/FONTS";
import { NavigationEditProfile } from "./components/NavigationEditProfile";
import { EditProfileImageContainer } from "./components/EditProfileImageContainer";

export const EditProfile = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "ios" ? 0 : 28,
        backgroundColor: COLORS.Background,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
      >
        <View style={{ marginBottom: 20, flexDirection: "column", gap: 20 }}>
          <NavigationEditProfile navigation={navigation} />
          <EditProfileImageContainer />
        </View>

        <EditProfileForm navigation={navigation} />
      </ScrollView>
      <View
        style={{
          backgroundColor: COLORS.White,
          padding: 20,
          flexDirection: "row",
          gap: 15,
          alignItems: "center",
        }}
      >
        <IconButton
          onPress={() => {
            navigation.navigate("Profile");
          }}
          size={24}
          mode="contained"
          style={[
            { backgroundColor: "rgba(233, 233, 233, 1)", flex: 1, height: 58 },
          ]}
          iconColor={COLORS.Accent}
          icon={require("../../../assets/icons/eye.png")}
        />

        <Button
          title="Submit"
          onPress={() => {}}
          mode="contained-tonal"
          style={[{ flex: 2 }]}
          labelStyle={{ color: COLORS.White }}
          // loading={Loading ? true : false}
          contentStyle={{
            backgroundColor: COLORS.Accent,
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: COLORS.White, ...FONTS.buttonText }}>
            Сохранить
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
