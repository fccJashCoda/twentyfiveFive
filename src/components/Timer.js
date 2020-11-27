import { useState, useEffect } from 'react';

const Timer = ({ startStop, reset, baseTime, paused }) => {
  // let date = new Date(0, 0, 0, 0, baseTime, 0);
  const [date, setDate] = useState(new Date(0, 0, 0, 0, baseTime, 0));
  const [time, setTime] = useState('');

  useEffect(() => {
    setDate((prevState) => {
      prevState = new Date(0, 0, 0, 0, 0, baseTime, 0);

      setTime(
        prevState.toLocaleTimeString(navigator.language, {
          minute: '2-digit',
          second: '2-digit',
        })
      );
      return prevState;
    });
    console.log(date);
  }, [baseTime]);

  useEffect(() => {
    let timer;
    // date = new Date(0, 0, 0, 0, baseTime, 0);
    // setTime(
    //   date.toLocaleTimeString(navigator.language, {
    //     minute: '2-digit',
    //     second: '2-digit',
    //   })
    // );
    const countDown = () => {
      date.setSeconds(date.getSeconds() - 1);
      console.log('inside date', date);
      setTime((prevState) => {
        // if (prevState === '24:55') {
        //   date = new Date(0, 0, 0, 0, baseTime, 0);
        //   console.log('shabang');
        // }
        prevState = date.toLocaleTimeString(navigator.language, {
          minute: '2-digit',
          second: '2-digit',
        });
        // console.log(prevState);
        // console.log(typeof prevState);
        return prevState;
      });
    };

    if (!paused) {
      timer = setInterval(countDown, 1000);

      return () => clearInterval(timer);
    }
  }, [paused]);

  console.log('outside date', date);
  return (
    <div id="timer-label">
      <p>Session</p>
      <h3 id="time-left">{time}</h3>
      <button id="start_stop" onClick={startStop}>
        Start
      </button>
      <button id="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default Timer;
