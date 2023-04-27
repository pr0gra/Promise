import { View, TextInput, } from "react-native";
import { Button } from "react-native-paper"
import { COLORS } from "../../../constants/Colors/Colors";
import UserAvatar from 'react-native-user-avatar';
import { Image } from "react-native";
import { useState } from "react";
import axios from "axios";
import { tokenStore } from "../../../../store";

export function AddingPostInput({ fullName, currentGoalId }) {

    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false)
    const token = tokenStore((state) => state.token);

    async function createPost(inputText, currentGoalId) {
        setLoading(true);

        try {
            const response = await axios.post(`/api/goals/${currentGoalId}/posts`,
                {
                    post:
                        { text: inputText }
                },
                {
                    headers: {
                        Authorization: `bearer ${token}`,
                    }
                },


            );
            return response.data;
        } catch (error) {
            if (error.response) {
                console.log(error.response);
            } else {
                console.log("NO RESPONSE");
            }
            throw new Error("Ошибка в создании Поста");
            return error;
        } finally {

            setLoading(false);

        }
    }

    return <View style={{ backgroundColor: COLORS.White, borderRadius: 20, marginLeft: 20, flexDirection: "row", marginBottom:20, paddingLeft: 20, paddingRight: 60, marginTop: 5, paddingVertical: 10, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <UserAvatar style={{ width: 20, height: 20, }} size={25} name={fullName} bgColor={COLORS.Accent} />
            <TextInput multiline={true} style={{ flex: 1 }} onChangeText={setInputText} value={inputText} placeholder="Написать..." />
        </View>

        <Button onPress={() => createPost(inputText, currentGoalId)}><Image style={{ width: 20, height: 20 }} source={require("../../../../assets/icons/send-02.png")} /></Button>
    </View>
}