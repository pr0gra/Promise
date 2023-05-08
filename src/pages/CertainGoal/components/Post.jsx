import { View } from "react-native";
import { Text } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { COLORS } from "../../../constants/Colors/Colors";
import { formatDate } from "../../../constants/Functions/formatDate";
import { ButtonReaction } from "./ButtonReaction";
import Rocket from "../../../../assets/icons/Rocket.png";
import MessageSquare from "../../../../assets/icons/message-square-01.png";
import SkeletonLoading from "../../../components/SkeletonLoading/SkeletonLoading";
export function Post({ text, postId, fullName, inserted_at = "" }) {
  return (
    <View
      key={postId}
      style={{
        backgroundColor: COLORS.White,
        borderRadius: 20,
        marginLeft: 20,
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 10,
        gap: 15,
        marginBottom: 10,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        {fullName !== "undefined undefined" ? (
          <UserAvatar
            style={{ width: 20, height: 20 }}
            size={25}
            name={fullName}
            bgColor={COLORS.Accent}
          />
        ) : (
          <SkeletonLoading
            borderRadius={100}
            height={15}
            width={15}
            backgroundColor={COLORS.LowAccent}
          />
        )}
        {inserted_at !== "" ? (
          <Text style={{ color: "rgba(175, 175, 175, 1)" }}>
            {formatDate(new Date(inserted_at))}
          </Text>
        ) : (
          <SkeletonLoading
            borderRadius={20}
            height={10}
            width={100}
            backgroundColor={COLORS.LowAccent}
          />
        )}
      </View>
      <Text>{text}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <ButtonReaction
          image={Rocket}
          onPress={() => console.log("Rocket")}
          text={"10"}
        />
        <ButtonReaction
          image={MessageSquare}
          onPress={() => console.log("Rocket")}
          text={"Советы"}
        />
      </View>
    </View>
  );
}
