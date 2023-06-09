import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TouchableOpacity } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { COLORS } from "../../../../../constants/Colors/Colors";
import axios from "axios";
import { goalJoins } from "../../../../../../store";
import SkeletonLoading from "../../../../../components/SkeletonLoading/SkeletonLoading";
import { NavigationContext } from "../../../../../../NavigationContext";
export const UserButtonComponent = memo(
  ({ userId, token, navigation, isVisible }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    const { isShowJoins, setIsShowJoins, goalIdState } =
      useContext(NavigationContext);
    const getUsers = useCallback(async function getUsers() {
      setLoading(true);

      if (isShowJoins) {
        try {
          const response = await axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `bearer ${token}` },
          });

          setUserData(response.data.data);
        } catch (error) {
          console.log("Ошибка в получении присоединившихся", error.response);

          // throw new Error("Ошибка в получении пользователя");
        } finally {
          setLoading(false);
        }
      } else return;
    });
    useEffect(() => {
      if (isShowJoins) {
        getUsers();
      } else return;
    }, [goalIdState, isShowJoins]);
    return (
      <>
        {!loading ? (
          <TouchableOpacity
            key={userData?.user_id}
            onPress={() => {
              navigation.navigate("Profile", { id: userData?.id });
              setIsShowJoins(false);
            }}
            style={{ zIndex: 100 }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                // height: 25,
                //   marginBottom: 10,
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: "white",
                borderRadius: 20,
              }}
            >
              <UserAvatar
                style={{ width: 20 }}
                size={20}
                name={`${userData?.first_name} ${userData?.last_name}`}
                bgColor={COLORS.Accent}
              />
              <Text>
                {userData?.first_name} {userData?.last_name}
              </Text>
            </View>
            <View
              style={{
                height: 10,
                backgroundColor: "transparent",
                width: "100%",
              }}
            />
          </TouchableOpacity>
        ) : (
          <>
            <SkeletonLoading width={"100%"} height={30} borderRadius={20} />
            <View
              style={{
                height: 10,
                backgroundColor: "transparent",
                width: "100%",
              }}
            />
          </>
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({});
