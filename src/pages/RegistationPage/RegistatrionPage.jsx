import React, { useEffect } from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import Form from "./components/Form";
export const RegistatrionPage = ({ navigation }) => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "ios" ? 0 : 28,
        backgroundColor: COLORS.Background,
        flex: 1,
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "" : "padding"}
      >
        <ScrollView
          contentContainerStyle={[styles.content]}
          showsVerticalScrollIndicator={false}
          indicatorStyle={COLORS.Accent}
        >
          <Text
            style={[
              GlobalStyles.pageTitle,
              { marginLeft: 30, marginBottom: 20 },
            ]}
          >
            Регистрация
          </Text>

          <Form navigation={navigation} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
