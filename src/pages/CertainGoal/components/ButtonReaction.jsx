import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";

export const ButtonReaction = ({ image, onPress, text, ...rest }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={COLORS.LowAccent}
      style={{ borderRadius: 100 }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 5,
          paddingHorizontal: 10,
          alignItems: "center",
          gap: 5,
          ...rest,
        }}
      >
        <Image source={image} style={{ width: 24, height: 24 }} />
        <Text style={{ color: COLORS.Accent, ...FONTS.postButtonText }}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
