import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistatrionPage } from "./src/pages/RegistationPage/RegistatrionPage";
import { SignInPage } from "./src/pages/SignInPage/SignInPage";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { WelcomePage } from "./src/pages/WelcomePage/WelcomePage";
import { COLORS } from "./src/constants/Colors/Colors";
import axios from "axios";
export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    RobotoFlex: require("./assets/fonts/RobotoFlex.ttf"),
  });

  axios.defaults.baseURL = "https://test.promise.waika28.ru";
  return (
    fontsLoaded && (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          {/* Начальная страница(Страница входа) */}

          <Stack.Screen
            name="SignIn"
            component={SignInPage}
            options={{ title: "Страница Входа", headerShown: false }}
          />
          {/* Страница регистрации */}
          <Stack.Screen
            name="SignUp"
            component={RegistatrionPage}
            options={{ title: "Страница Входа", headerShown: false }}
          />
          {/* welcompe page */}
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
            options={{ title: "Приветственная страница", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
