import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import TimerContext from '../context/TimerContext';
import TimerControls from '../components/TimerControls';
import ProgressBar from '../components/ProgressBar';
import { icons } from '../constants/index';


function HomeScreen({ navigation }) {
  const { state, dispatch } = useContext(TimerContext);
//   console.log(state.timers,"retreived from addTimers")

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(null);
  console.log(currentTimer,"currentTime outside timelogic")

  const handleTimerLogic = (timer) => {
    const [currentTime, setCurrentTime] = useState(timer.time);
    console.log(currentTime,"current time  inside the timelogic")

    useEffect(() => {
      let interval = null;

      if (timer.status === 'running') {
        interval = setInterval(() => {
          setCurrentTime((prevTime) => {
            if (prevTime > 0) {
              const newTime = prevTime - 1;
              dispatch({
                type: 'UPDATE_TIMER',
                payload: { ...timer, time: newTime },
              });
              return newTime;
            } else {
              clearInterval(interval);
              dispatch({
                type: 'ADD_HISTORY',
                payload: { ...timer, completedAt: new Date().toISOString() },
              });
              dispatch({ type: 'RESET_TIMER', payload: timer.id });

              setCurrentTimer(timer);
              setIsModalVisible(true);
              return 0;
            }
          });
        }, 1000);
      } else if (timer.status === 'paused') {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [timer.status, currentTime]);

    return currentTime;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddTimer')}
        style={styles.addButton}
      >
      <Image source={icons.clock} style={styles.addIcon} />
        <Text style={styles.addButtonText}>Add Timer</Text>
      </TouchableOpacity>

      {state.timers.length === 0 ? (
        <Text style={styles.noTimersText}>No timers added</Text>
      ) : (
        <FlatList
          data={state.timers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const remainingTime = handleTimerLogic(item);

            return (
              <View style={styles.timerCard}>
                <Text style={styles.timerName}>
                  {item.name} ({item.category})
                </Text>
                <Text style={styles.timeText}>
                  Time Remaining: {remainingTime}s | Status: {item.status}
                </Text>

                <ProgressBar remaining={remainingTime} total={item.duration} />

                <TimerControls timer={item} />

                <TouchableOpacity
                  onPress={() =>
                    dispatch({ type: 'DELETE_TIMER', payload: item.id })
                  }
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      <TouchableOpacity
        style={styles.navigateButton}
        onPress={() => navigation.navigate('TimerList')}
      >
        <Text style={styles.buttonText}>View Timer List</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Timer Finished!</Text>
            <Text style={styles.modalMessage}>
              Your timer "{currentTimer?.name}" is completed.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  addIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noTimersText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  timerCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  timerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timeText: {
    color: '#6200EE',
    marginVertical: 8,
    fontSize: 14,
  },
  deleteText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
  navigateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 350,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
