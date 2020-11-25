import { useState } from 'react';
import Setter from './Setter';
import Timer from './Timer';

const TwentyfiveFive = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);

  const increment = (task) => {
    if (task === 'break') {
      setBreakTime((prevState) => (prevState < 60 ? prevState + 1 : prevState));
    } else {
      setSessionTime((prevState) =>
        prevState < 60 ? prevState + 1 : prevState
      );
    }
  };

  const decrement = (task) => {
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
  };

  return (
    <div>
      <Timer />
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
