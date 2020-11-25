import { useState, useEffect } from 'react';
import Setter from './Setter';

const TwentyfiveFive = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);

  const [mouseDown, setMouseDown] = useState(false);

  const foo = () => {
    setMouseDown(true);
    console.log(mouseDown);
    // const loop = (time) => {
    //   console.log('running');
    //   setTimeout(() => {
    //     setBreakTime((prevState) => prevState + 1);
    //     loop(time);
    //   }, time);
    // };

    // loop(500);
  };

  const bar = () => {
    setMouseDown(false);
  };

  useEffect(() => {
    let timer;

    const loop = (time) => {
      timer = setTimeout(() => {
        time = time > 100 ? time - 100 : time;
        setBreakTime((prevState) =>
          prevState < 60 ? prevState + 1 : prevState
        );
        loop(time);
      }, time);
    };

    if (mouseDown) {
      timer = setTimeout(() => loop(500));

      return () => clearTimeout(timer);
    }
  }, [mouseDown]);

  const increment = (task) => {
    if (task === 'break') {
      if (breakTime < 60) setBreakTime(breakTime + 1);
    } else {
      setSessionTime(sessionTime + 1);
    }
  };

  const decrement = (task) => {
    if (task === 'break') {
      if (breakTime > 0) setBreakTime(breakTime - 1);
    } else {
      setSessionTime(sessionTime - 1);
    }
  };

  return (
    <div>
      <Setter
        type={'break'}
        time={breakTime}
        increment={increment}
        decrement={decrement}
        foo={foo}
        bar={bar}
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
