import { useState } from 'react';
import Setter from './Setter';

const TwentyfiveFive = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);

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
