import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import TimerContext from "../context/TimerContext";
import { icons } from "../constants/index";  

function TimerControls({ timer }) {
  const { dispatch } = useContext(TimerContext);

  const startTimer = () => {
    dispatch({ type: "START_TIMER", payload: timer.id });
  };

  const pauseTimer = () => {
    dispatch({ type: "PAUSE_TIMER", payload: timer.id });
  };

  const resetTimer = () => {
    dispatch({ type: "RESET_TIMER", payload: timer.id });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startTimer} style={styles.button}>
        <Image source={icons.play} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={pauseTimer} style={styles.button}>
        <Image source={icons.pause} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={resetTimer} style={styles.button}>
        <Image source={icons.reset} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#6200EE",  
    padding: 15,
    borderRadius: 50,           
    elevation: 5,                
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,    
    height: 30,
    tintColor: "white",  
  },
});

export default TimerControls;
