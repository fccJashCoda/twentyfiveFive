import { useState, useEffect } from 'react';
import Setter from './Setter';
import Timer from './Timer';

const TwentyfiveFive = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [paused, setPaused] = useState(true);
  const [state, setState] = useState('session');

  const reset = () => {
    setBreakTime(5);
    setSessionTime(25);
    setPaused(true);
    setState('session');
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

  const [date, setDate] = useState(new Date(0, 0, 0, 0, sessionTime, 0));
  const [time, setTime] = useState('');

  const changeState = () => {
    setState((prevState) => (prevState === 'session' ? 'break' : 'session'));
  };

  useEffect(() => {
    const base = state === 'session' ? sessionTime : breakTime;

    setDate((prevState) => {
      prevState = new Date(0, 0, 0, 0, base, 0);

      setTime(
        prevState.toLocaleTimeString(navigator.language, {
          minute: '2-digit',
          second: '2-digit',
        })
      );
      return prevState;
    });
    console.log(date);
  }, [state]);
  // }, [sessionTime]);

  useEffect(() => {
    let timer;

    const countDown = () => {
      date.setSeconds(date.getSeconds() - 1);
      console.log('inside date', date);
      setTime((prevState) => {
        console.log('state', state);
        if (prevState === '00:00') {
          changeState();
          console.log('newstate', state);
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
    }
    return () => clearInterval(timer);
  }, [paused, date, state]);

  const increment = (task) => {
    // there is a bug where when the user keeps the mousebutton down
    // but leaves the button area, the count keeps incrementing forever
    // until he hovers back on it with the mousebutton down
    // could be fixed by checking mouse position relative to the button?
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
        if (breakTime > 0)
          setBreakTime((prevState) =>
            prevState > 0 ? prevState - 1 : prevState
          );
      } else {
        if (sessionTime > 0)
          setSessionTime((prevState) =>
            prevState > 0 ? prevState - 1 : prevState
          );
      }
    }
  };

  return (
    <div>
      {paused && <p>paused</p>}
      <Timer reset={reset} startStop={startStop} time={time} />
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
