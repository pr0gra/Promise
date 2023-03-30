import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistatrionPage } from "./src/pages/RegistationPage/RegistatrionPage";
import { SignIn } from "./src/pages/SignIn/SignIn";
import { useFonts } from "expo-font";
import { COLORS } from "./src/constants/Colors/Colors";
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
        <Stack.Navigator initialRouteName="SignIn">
          {/* Начальная страница(Страница входа) ее пилит олександер */}
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "Страница Входа", headerShown: false }}
          />
          {/* Страница регистрации */}
          <Stack.Screen
            name="SignOut"
            component={RegistatrionPage}
            options={{ title: "Страница Входа", headerShown: false }}
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
