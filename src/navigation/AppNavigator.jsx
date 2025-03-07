import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AddTimerScreen from '../screens/AddTimerScreen';
import HistoryScreen from '../screens/HistoryScreen';
import TimerListScreen from '../screens/TimerListScreen';

const Stack = createStackNavigator();
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="AddTimer" component={AddTimerScreen} />

        <Stack.Screen name="History" component={HistoryScreen} />
        
        <Stack.Screen name="TimerList" component={TimerListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
