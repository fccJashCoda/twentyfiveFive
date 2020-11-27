import { useState, useEffect } from 'react';
import Setter from './Setter';
import Timer from './Timer';

const TwentyfiveFive = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  // const [breakTime, setBreakTime] = useState(3);
  // const [sessionTime, setSessionTime] = useState(5);
  const [paused, setPaused] = useState(true);
  const [state, setState] = useState('Session');
  const [date, setDate] = useState(new Date(0, 0, 0, 0, 5, 0));
  // const [date, setDate] = useState(new Date(0, 0, 0, 0, 0, 5, 0));
  const [time, setTime] = useState('');

  const reset = () => {
    setBreakTime(5);
    setSessionTime(25);
    setPaused(true);
    setState('Session');
    setDate((prevState) => {
      prevState = new Date(0, 0, 0, 0, sessionTime, 0);

      setTime(
        prevState.toLocaleTimeString(navigator.language, {
          minute: '2-digit',
          second: '2-digit',
        })
      );
      return prevState;
    });
  };

  const startStop = () => {
    setPaused(!paused);
  };

  useEffect(() => {
    setTime(
      date.toLocaleTimeString(navigator.language, {
        minute: '2-digit',
        second: '2-digit',
      })
    );
  }, []);

  useEffect(() => {
    const base = state === 'Session' ? sessionTime : breakTime;
    console.log('current state when setting time', state);
    setDate((prevState) => {
      prevState = new Date(0, 0, 0, 0, base, 0);
      // prevState = new Date(0, 0, 0, 0, 0, base, 0);

      setTime(
        prevState.toLocaleTimeString(navigator.language, {
          minute: '2-digit',
          second: '2-digit',
        })
      );
      return prevState;
    });
  }, [sessionTime, breakTime]);

  useEffect(() => {
    let timer;

    const countDown = () => {
      date.setSeconds(date.getSeconds() - 1);
      setTime((prevState) => {
        if (prevState === '00:01') {
          console.log('switch');
          let base = state === 'Session' ? breakTime : sessionTime;
          // setDate(() => new Date(0, 0, 0, 0, 0, base + 1));
          setDate(() => new Date(0, 0, 0, 0, base, 1));
        }
        if (time === '00:00') {
          setState((prev) => (prev === 'Session' ? 'Break' : 'Session'));
        }
        prevState = date.toLocaleTimeString(navigator.language, {
          minute: '2-digit',
          second: '2-digit',
        });

        return prevState;
      });
    };

    if (!paused) {
      timer = setInterval(countDown, 1000);
      return () => {
        console.log('clearing timer');
        clearInterval(timer);
      };
    }
  }, [paused, date, state]);

  // button logic
  const increment = (task) => {
    if (paused) {
      if (task === 'break') {
        setBreakTime((prevState) =>
          prevState < 60 ? prevState + 1 : prevState
        );
      } else {
        setSessionTime((prevState) =>
          prevState < 60 ? prevState + 1 : prevState
        );
      }
    }
  };

  const decrement = (task) => {
    if (paused) {
      if (task === 'break') {
        if (breakTime > 1)
          setBreakTime((prevState) =>
            prevState > 0 ? prevState - 1 : prevState
          );
      } else {
        if (sessionTime > 1)
          setSessionTime((prevState) =>
            prevState > 0 ? prevState - 1 : prevState
          );
      }
    }
  };

  return (
    <div>
      {paused && <p>paused</p>}
      <Timer reset={reset} startStop={startStop} time={time} state={state} />
      <Setter
        type={'break'}
        time={breakTime}
        increment={increment}
        decrement={decrement}
      />
      <Setter
        type={'session'}
        time={sessionTime}
        increment={increment}
        decrement={decrement}
      />
    </div>
  );
};

export default TwentyfiveFive;
