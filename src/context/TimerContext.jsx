import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerContext = createContext();

const initialState = {timers: [], history: []};

const timerReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_TIMER':
      return {...state, timers: [...state.timers, action.payload]};

    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id ? action.payload : timer,
        ),
      };

    case 'DELETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter(t => t.id !== action.payload),
      };

    case 'ADD_HISTORY':
      return {...state, history: [...state.history, action.payload]};

    case 'LOAD_DATA':
      return action.payload;

    case 'START_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload ? {...timer, status: 'running'} : timer,
        ),
      };

    case 'PAUSE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload ? {...timer, status: 'paused'} : timer,
        ),
      };

    case 'RESET_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload
            ? {...timer, remaining: 0, status: 'paused'}
            : timer,
        ),
      };

    case 'START_ALL_TIMERS':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.category === action.payload
            ? {...timer, status: 'running'}
            : timer,
        ),
      };

    case 'PAUSE_ALL_TIMERS':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.category === action.payload
            ? {...timer, status: 'paused'}
            : timer,
        ),
      };

    case 'RESET_ALL_TIMERS':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.category === action.payload
            ? {...timer, remaining: 0, status: 'paused'}
            : timer,
        ),
      };

    default:
      return state;

  }
};

export const TimerProvider = ({children}) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem('timers').then(data => {
      if (data) dispatch({type: 'LOAD_DATA', payload: JSON.parse(data)});
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('timers', JSON.stringify(state));
  }, [state]);

  return (
    <TimerContext.Provider value={{state, dispatch}}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
