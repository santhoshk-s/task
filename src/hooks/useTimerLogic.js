import { useEffect, useState } from 'react';
import { useContext } from 'react';
import TimerContext from '../context/TimerContext';

const useTimerLogic = timer => {
  const { dispatch } = useContext(TimerContext);
  const [currentTime, setCurrentTime] = useState(timer.time);
  console.log(currentTime,"this is from the uselogic hooks")

  useEffect(() => {
    let interval = null;

    if (timer.status === 'running') {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
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
            return 0;
          }
        });
      }, 1000);
    } else if (timer.status === 'paused') {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer.status]);

  return currentTime;
};

export default useTimerLogic;
