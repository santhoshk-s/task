import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import TimerContext from '../context/TimerContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {icons} from '../constants/index';

function AddTimerScreen({navigation}) {
  const {dispatch} = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Workout');

  const addTimer = async () => {
    if (name && duration) {
      const newTimer = {
        id: Date.now().toString(),
        name,
        duration: parseInt(duration),
        category,
        remaining: parseInt(duration),
        status: 'paused',
      };

      dispatch({type: 'ADD_TIMER', payload: newTimer});

      const storedTimers = await AsyncStorage.getItem('timers');
      const timers = storedTimers ? JSON.parse(storedTimers) : [];
      timers.push(newTimer);


      await AsyncStorage.setItem('timers', JSON.stringify(timers));

      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Timer?</Text>

      <TextInput
        style={styles.input}
        placeholder="Timer Name"
        onChangeText={setName}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration (seconds)"
        keyboardType="numeric"
        onChangeText={setDuration}
        value={duration}
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={setCategory}>
        <Picker.Item label="Workout" value="Workout" />
        <Picker.Item label="Study" value="Study" />
        <Picker.Item label="Break" value="Break" />
        <Picker.Item label="Meditation" value="Meditation" />
        <Picker.Item label="Sleep" value="Sleep" />
        <Picker.Item label="Meeting" value="Meeting" />
      </Picker>

      <TouchableOpacity style={styles.addButton} onPress={addTimer}>
        <Image source={icons.clock} style={styles.addIcon} />
        <Text style={styles.addText}>Add Timer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
  },
  addIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  addText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTimerScreen;
