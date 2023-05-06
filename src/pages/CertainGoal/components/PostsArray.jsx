import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { tokenStore } from "../../../../store";
import axios from "axios";

import { COLORS } from "../../../constants/Colors/Colors";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Post } from "./Post";
import { AddingPostInput } from "./AddingPostInput";

export function PostsArray({ fullName, goalId, inProfile, postsLimit }) {
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

      const sortedData = response.data.data.sort((a, b) => {
        return new Date(b.inserted_at) - new Date(a.inserted_at);
      });

      setPostsArray(sortedData);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log("NO RESPONSE");
      }
      throw new Error("Ошибка в получении постов");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getGoalPosts(goalId);
  }, []);

  return (
    <>
      <FlatList
        data={
          inProfile
            ? postsArray.slice(0, postsLimit ? 1 : postsArray.length)
            : postsArray
        }
        renderItem={({ item }) => (
          <Post
            fullName={fullName}
            text={item.text}
            postId={item.id}
            inserted_at={item.inserted_at}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        indicatorStyle={COLORS.Accent}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            colors={[COLORS.Accent]}
            refreshing={loading}
          />
        }
        style={{ flexGrow: 0 }}
      />
      <AddingPostInput
        fullName={fullName}
        currentGoalId={goalId}
        handleRefresh={handleRefresh}
      />
    </>
  );
}
