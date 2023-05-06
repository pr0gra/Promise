import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import { ButtonReaction } from "./ButtonReaction";
import Rocket from "../../../../assets/icons/Rocket.png";
import Bell from "../../../../assets/icons/bell-01.png";
import messageSquare from "../../../../assets/icons/message-square-01.png";
export const PostButtons = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10, flexDirection: "row" }}>
        <ButtonReaction
          image={messageSquare}
          onPress={() => console.log("Открыть чат")}
          text={"Открыть чат"}
        />
      </View>
      <View style={styles.bottomButtonsContainer}>
        <ButtonReaction
          image={Bell}
          onPress={() => console.log("Bell")}
          text={"10"}
        />
        <ButtonReaction
          image={Rocket}
          onPress={() => console.log("Rocket")}
          text={"10"}
        />
        <ButtonReaction
          image={messageSquare}
          onPress={() => console.log("messageSquare")}
          text={"советы"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  bottomButtonsContainer: { flexDirection: "row", gap: 10 },
});
