import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { tokenStore } from "../../../../store";
import axios from "axios";

import { COLORS } from "../../../constants/Colors/Colors";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Post } from "./Post";

export function PostsArray({ fullName, goalId }) {
  const [loading, setLoading] = useState(false);
  const [postsArray, setPostsArray] = useState([]);
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

      setPostsArray([...response.data.data]);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log("NO RESPONSE");
      }
      throw new Error("Ошибка в получении подпостов");
    } finally {
      setLoading(false);
    }
  }
  console.log(postsArray);
  useEffect(() => {
    getGoalPosts(goalId);
  }, []);

  return (
    <FlatList
      data={postsArray}
      renderItem={({ item }) => (
        <Post fullName={fullName} text={item.text} postId={item.id} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ flexGrow: 1, gap: 10 }}
      showsVerticalScrollIndicator={true}
      indicatorStyle={COLORS.Accent}
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} colors={[COLORS.Accent]} />
      }
    />
  );
}