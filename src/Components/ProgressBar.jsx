import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from 'react-native-progress';

function ProgressBar({ remaining, total }) {
  const progress = remaining / total;
  console.log(progress*100,"thiis is progresss statee")

  return (
    <View style={styles.container}>
      <Text>{Math.round(progress * 100)}%</Text>
      <Progress.Bar
        progress={progress}  
        width={200} 
        height={10}  
        color="#4caf50"
        unfilledColor="#e0e0e0"
        borderRadius={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     alignItems: "center",
      padding: 10 },
});

export default ProgressBar;
