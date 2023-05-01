import { View } from "react-native";
import { Text } from "react-native";
import UserAvatar from 'react-native-user-avatar';
import { COLORS } from "../../../constants/Colors/Colors";
import { formatDate } from "../../../constants/Functions/formatDate";

export function Post({ text, postId, fullName }) {

    return <View style={{ backgroundColor: COLORS.White, borderRadius: 20, marginLeft: 20, flexDirection: "column", paddingLeft: 20, paddingRight: 60, paddingVertical: 10, gap: 15}}>
        <View style={{flexDirection: "row", gap: 10, alignItems: "center", }}><UserAvatar style={{ width: 20, height: 20, }} size={25} name={fullName} bgColor={COLORS.Accent} /><Text style={{color: "rgba(175, 175, 175, 1)"}}>{formatDate(new Date)}</Text></View>
        <Text>{text}</Text>
    </View>
}
