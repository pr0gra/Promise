import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../../../constants/Colors/Colors";
import { FONTS } from "../../../constants/FONTS/FONTS";
import axios from "axios";
import { tokenStore } from "../../../../store.js";
import { PostsArrayList } from "./PostsArrayList";
import { CreatePostInput } from "./CreatePostInput";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
export const PublicGoal = ({ item, token, firstName, lastName }) => {
  const [loading, setLoading] = useState(false);
  const [postsArray, setPostsArray] = useState(null);

  const goalId = item?.id;
  const userId = item?.user_id;
  async function getGoalPosts() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/goals/${goalId}/posts`, {
        headers: { Authorization: `bearer ${token}` },
      });

      const sortedData = response.data.data.sort((a, b) => {
        return new Date(b.inserted_at) - new Date(a.inserted_at);
      });

      setPostsArray(sortedData);

      return response.data.data;
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
    getGoalPosts();
  }, []);
  const handleRefresh = () => {
    console.log("Refersh");
    getGoalPosts();
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text> тут аватарка и имя с временем</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        <PostsArrayList
          token={token}
          data={postsArray}
          handleRefresh={handleRefresh}
          loading={loading}
        />
      </ScrollView>
      <CreatePostInput
        handleRefresh={handleRefresh}
        goalId={goalId}
        token={token}
        firstName={firstName}
        lastName={lastName}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.White,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    ...FONTS.mainText,
  },
});
