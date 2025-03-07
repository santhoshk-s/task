import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import TimerContext from "../context/TimerContext";
import { icons } from "../constants/index";  

function Actions({ category }) {
  const { dispatch } = useContext(TimerContext);
  console.log(category)

  const startAll = () => {
    dispatch({ type: "START_ALL_TIMERS", payload: category });
  };

  const pauseAll = () => {
    dispatch({ type: "PAUSE_ALL_TIMERS", payload: category });
  };

  const resetAll = () => {
    dispatch({ type: "RESET_ALL_TIMERS", payload: category });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startAll} style={styles.button}>
        <Image source={icons.play} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={pauseAll} style={styles.button}>
        <Image source={icons.pause} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={resetAll} style={styles.button}>
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
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  icon: {
    width: 24,
    height: 24, 
    tintColor: "white",
  },
});

export default Actions;
