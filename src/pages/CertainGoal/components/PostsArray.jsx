import { useState, useEffect, useCallback } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { tokenStore, userInformationStore } from "../../../../store";
import axios from "axios";
import { Button } from "react-native-paper";
import { COLORS } from "../../../constants/Colors/Colors";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Post } from "./Post";
import { AddingPostInput } from "./AddingPostInput";

export function PostsArray({ fullName, goalId, unwrap, userId, navigation }) {
  const [loading, setLoading] = useState(false);
  const [postsArray, setPostsArray] = useState([]);
  const [postsLimit, setPostsLimit] = useState(true);

  const token = tokenStore((state) => state.token);

  function handleRefresh() {
    getGoalPosts(goalId);
  }

  async function getGoalPosts(goalId) {
    setLoading(true);
    try {
      const response = await axios.get(`/api/goals/${goalId}/posts`, {
        headers: { Authorization: `bearer ${token}` },
      });

      const sortedData = response.data.data.sort((a, b) => {
        return new Date(b.inserted_at) - new Date(a.inserted_at);
      });

      setPostsArray(sortedData);
    } catch (error) {
      console.log("Ошибка в получении постов", error.response.data);

      // throw new Error("Ошибка в получении постов");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getGoalPosts(goalId);
  }, []);
  const yourId = userInformationStore((state) => state.userInformation);

  return (
    <>
      {unwrap && postsArray.length > 1 ? (
        <View style={{ width: "100%" }}>
          <Button
            style={{ alignItems: "flex-start", marginLeft: 20 }}
            icon={
              postsLimit
                ? require("../../../../assets/icons/chevron-right.png")
                : require("../../../../assets/icons/chevron-down.png")
            }
            size={24}
            onPress={() => {
              setPostsLimit((state) => !state);
            }}
            labelStyle={{ color: COLORS.Accent }}
          >
            <Text style={{ color: COLORS.Accent }}>
              {postsLimit ? "Развернуть" : "Свернуть"}
            </Text>
          </Button>
        </View>
      ) : (
        unwrap && <View style={{ height: 10 }} />
      )}

      {unwrap
        ? postsArray.slice(0, postsLimit ? 1 : postsArray.length).map((e) => {
            return (
              <Post
                key={e.id}
                fullName={fullName}
                text={e.text}
                postId={e.id}
                goalId={goalId}
                token={token}
                handleRefreshPosts={handleRefresh}
                userId={userId}
                inserted_at={e.inserted_at}
                navigation={navigation}
              />
            );
          })
        : postsArray.map((e) => {
            return (
              <Post
                key={e.id}
                fullName={fullName}
                text={e.text}
                postId={e.id}
                goalId={goalId}
                userId={userId}
                token={token}
                handleRefreshPosts={handleRefresh}
                inserted_at={e.inserted_at}
                navigation={navigation}
              />
            );
          })}
      {/* )} */}

      {yourId.id === userId && (
        <AddingPostInput
          fullName={fullName}
          currentGoalId={goalId}
          handleRefresh={handleRefresh}
        />
      )}
    </>
  );
}
