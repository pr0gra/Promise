import {
    Image,
    Text,
    View,
  } from "react-native";
import { COLORS } from "../../constants/Colors/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";

export function NotificationsPage() {
  return  <View
  style={{
    paddingTop: 62,
    backgroundColor: COLORS.Background,
    flex: 1,
  }}
>
<View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 20,
        }}
      >
        <IconButton
          iconColor={COLORS.Accent}
          icon={require("../../../assets/icons/arrow-narrow-left.png")}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={[
            GlobalStyles.pageTitle,
            { marginLeft: 20, marginTop: 20, marginBottom: 20 },
          ]}
        >
          Уведомления
        </Text>
      </View>
</View>;
}
