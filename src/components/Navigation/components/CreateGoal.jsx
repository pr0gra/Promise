import React, { useCallback, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { runOnJS, runOnUI, withTiming } from "react-native-reanimated"; // Updated import
import { COLORS } from "../../../constants/Colors/Colors";

export const CreateGoal = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = ["25%", "50%"];

  const handleSheetChanges = useCallback(
    (index) => {
      runOnUI(() => {
        // Wrapped the call with runOnUI
        runOnJS(() => {
          console.log("handleSheetChanges", index);
        })();
      })();
    },
    [] // add dependencies here if needed
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <Text>CreateGoal</Text>
        <Text>CreateGoal</Text>
        <Text>CreateGoal</Text>
        <Text>CreateGoal</Text>
        <Text>CreateGoal</Text>
        <Text>CreateGoal</Text>
        <Text>CreateGoal</Text>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LowAccent,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
    zIndex: 3,
  },
});
