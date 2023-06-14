import {
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { COLORS } from "../../../constants/Colors/Colors";
import { formatDate } from "../../../constants/Functions/formatDate";
import { ButtonReaction } from "./ButtonReaction";
import Rocket from "../../../../assets/icons/Rocket.png";
import MessageSquare from "../../../../assets/icons/message-square-01.png";
import SkeletonLoading from "../../../components/SkeletonLoading/SkeletonLoading";
import axios from "axios";
import { useState } from "react";
import { FONTS } from "../../../constants/FONTS/FONTS";
import { tokenStore, userInformationStore } from "../../../../store";
export function Post({
  text,
  postId,
  fullName,
  inserted_at = "",
  goalId,
  userId,
  handleRefreshPosts,
  navigation,
}) {
  const [showModal, setShowModal] = useState(false);
  const token = tokenStore((state) => state.token);
  const userData = userInformationStore((state) => state.userInformation);

  async function deletePost() {
    try {
      const response = await axios.delete(
        `/api/goals/${goalId}/posts/${postId}`,

        {
          headers: { Authorization: `bearer ${token}` },
        }
      );

      handleRefreshPosts();
      console.log("Удалил");
      return response;
    } catch (error) {
      console.log("Не удалил", error);
      // throw new Error("Не удалил");
    } finally {
      setShowModal(false);
    }
  }
  return (
    <View
      key={postId}
      style={{
        backgroundColor: COLORS.White,
        borderRadius: 20,
        marginLeft: 20,
        flexDirection: "column",
        paddingHorizontal: 20,
        paddingVertical: 15,
        gap: 5,
        marginBottom: 10,
        position: "relative",
      }}
    >
      {showModal && (
        <TouchableHighlight
          style={{
            position: "absolute",
            top: 50,
            right: 10,
            backgroundColor: COLORS.Accent,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 100,
            zIndex: 2,
          }}
          onPress={() => {
            deletePost();
          }}
        >
          <Text style={{ color: COLORS.White, ...FONTS.postButtonText }}>
            удалить
          </Text>
        </TouchableHighlight>
      )}
      <View
        style={{
          flexDirection: "row",

          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          {fullName !== "undefined undefined" ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile", { id: userId })}
            >
              <UserAvatar
                style={{ width: 20, height: 20 }}
                size={25}
                name={fullName}
                bgColor={COLORS.Accent}
              />
            </TouchableOpacity>
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
        {userId == userData.id && (
          <ButtonReaction
            image={require("../../../../assets/icons/dots-vertical.png")}
            onPress={() => {
              setShowModal((state) => !state);
            }}
          />
        )}
      </View>
      <Text>{text}</Text>
      {/* <View style={{ flexDirection: "row", gap: 10 }}>
        <ButtonReaction
          image={Rocket}
          onPress={() => console.log("Rocket")}
          text={"10"}
        />
        <ButtonReaction
          image={MessageSquare}
          onPress={() => console.log("Rocket")}
        />
      </View> */}
    </View>
  );
}
