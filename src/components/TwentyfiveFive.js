import { useState, useEffect } from 'react';
import Setter from './Setter';
import Timer from './Timer';

const TwentyfiveFive = () => {
  let date = new Date(0, 0, 0, 0, 25, 0);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [paused, setPaused] = useState(true);
  const [time, setTime] = useState(
    date.toLocaleTimeString(navigator.language, {
      minute: '2-digit',
      second: '2-digit',
    })
  );

  useEffect(() => {
    let timer;

    const countDown = () => {
      date.setSeconds(date.getSeconds() - 1);
      setTime((prevState) => {
        if (prevState === '24:55') {
          date = new Date(0, 0, 0, 0, 25, 0);
          console.log('shabang');
        }
        prevState = date.toLocaleTimeString(navigator.language, {
          minute: '2-digit',
          second: '2-digit',
        });
        console.log(prevState);
        console.log(typeof prevState);
        return prevState;
      });
    };

    if (!paused) {
      timer = setInterval(countDown, 1000);

      return () => clearInterval(timer);
    }
  }, [paused]);

  const reset = () => {
    setBreakTime(5);
    setSessionTime(25);
    setPaused(true);
  };

  const startStop = () => {
    setPaused(!paused);
  };

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
      <p>{time}</p>
      <Timer reset={reset} startStop={startStop} paused={paused} date={date} />
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
