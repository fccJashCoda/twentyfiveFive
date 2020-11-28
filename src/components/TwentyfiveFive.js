import { useState, useEffect } from 'react';
import Setter from './Setter';
import Timer from './Timer';

function Clock(minutes, seconds = '00') {
  this.minutes = String(minutes).padStart(2, '0');
  this.seconds = String(seconds).padStart(2, '0');
  this.tickDown = function () {
    if (this.seconds === '00') {
      this.minutes = String(minutes - 1).padStart(2, '0');
    }
    this.seconds =
      this.seconds === '00' ? '59' : String(this.seconds - 1).padStart(2, '0');
  };
  this.display = function () {
    return `${this.minutes}:${this.seconds}`;
  };
}

const TwentyfiveFive = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [paused, setPaused] = useState(true);
  const [state, setState] = useState('Session');
  const [date, setDate] = useState(new Clock(sessionTime));
  const [time, setTime] = useState('');

  useEffect(() => {
    const base = state === 'Session' ? sessionTime : breakTime;
    setDate((prevState) => {
      prevState = new Clock(base);

      setTime(prevState.display());
      return prevState;
    });
  }, [sessionTime, breakTime]);

  useEffect(() => {
    let timer;

    const countDown = () => {
      date.tickDown();

      setTime((prevState) => {
        if (prevState === '00:01') {
          let base = state === 'Session' ? breakTime : sessionTime;
          setDate(() => new Clock(base, 1));
          playAudio();
        }
        if (prevState === '00:00') {
          setState((prev) => (prev === 'Session' ? 'Break' : 'Session'));
        }
        prevState = date.display();

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

  const reset = () => {
    resetAudio();
    setBreakTime((prevState) => (prevState = 5));
    setSessionTime((prevSessionTime) => {
      prevSessionTime = 25;
      setDate((prevState) => {
        prevState = new Clock(prevSessionTime);
        setTime((prevTime) => {
          prevTime = prevState.display();
          console.log(prevTime);

          return prevTime;
        });
        return prevState;
      });

      return prevSessionTime;
    });
    setPaused(true);
    setState('Session');
  };

  const startStop = () => {
    setPaused(!paused);
  };

  const playAudio = () => {
    const audio = document.getElementById('beep');
    console.log(audio);
    audio.play();
  };

  const resetAudio = () => {
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

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
    <>
      <audio
        src="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
        type="audio/mp3"
        id="beep"
      />
      <Setter
        type={'session'}
        time={sessionTime}
        increment={increment}
        decrement={decrement}
      />
      <Timer
        reset={reset}
        startStop={startStop}
        time={time}
        state={state}
        paused={paused}
      />
      <Setter
        type={'break'}
        time={breakTime}
        increment={increment}
        decrement={decrement}
      />
    </>
  );
};

export default TwentyfiveFive;
