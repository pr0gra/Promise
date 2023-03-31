import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistatrionPage } from "./src/pages/RegistationPage/RegistatrionPage";
import { SignInPage } from "./src/pages/SignInPage/SignInPage";
import { useFonts } from "expo-font";
import { COLORS } from "./src/constants/Colors/Colors";
import { WelcomePage } from "./src/pages/WelcomePage/WelcomePage";
import MySplashScreen from "./src/pages/SplashScreen/SplashScreen";
export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    "Roboto-flex": require("./assets/fonts/RobotoFlex-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator animating={true} color={COLORS.Accent} />;
  }

  return (
    fontsLoaded && (
      <NavigationContainer>
        {/* initialRouteName изменить на SignIn */}
        {/* <Stack.Navigator initialRouteName="SignIn"> */}
        <Stack.Navigator initialRouteName="SignIn">
          {/* Начальная страница(Страница входа) ее пилит олександер */}

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
