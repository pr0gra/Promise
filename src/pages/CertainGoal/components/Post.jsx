import { View } from "react-native";
import { Text } from "react-native";
import UserAvatar from 'react-native-user-avatar';
import { COLORS } from "../../../constants/Colors/Colors";

export function Post({ text, postId, fullName }) {
    console.log(text)
    return <View style={{ backgroundColor: COLORS.White, borderRadius: 20, marginLeft: 20, flexDirection: "column", paddingLeft: 20, paddingRight: 60, paddingVertical: 10, gap: 15}}>
        <View><UserAvatar style={{ width: 20, height: 20, }} size={25} name={fullName} bgColor={COLORS.Accent} /></View>
        <Text>{text}</Text>
    </View>
}
