import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function App() {
  const Stack = createNativeStackNavigator();
  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        {/* Эта кнопка переключает страницы приложения, navigation берется из  пропсов*/}

        {/* в параметрах navigate нужно написать name страницы, которое указано в роутинге в stack.screen */}
        <Button
          onPress={() => navigation.navigate("Details")}
          mode="contained-tonal"
        >
          <Text>Go to Details</Text>
        </Button>
      </View>
    );
  }
  function DetailsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>

        {/* таким образом можно вернуться обратно */}
        <Button
          title="Go back"
          onPress={() => navigation.goBack()}
          mode="contained-tonal"
        >
          <Text>Go back</Text>
        </Button>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Это сделано для примера */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // headerShown: false убирает навигационную панель
          options={{ title: "Начальная страница", headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Cтраница сведений", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
