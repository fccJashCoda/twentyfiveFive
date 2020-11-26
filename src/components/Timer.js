import { useState } from 'react';

const Timer = () => {
  const [paused, setPaused] = useState(true);
  return (
    <div id="timer-label">
      <p>Session</p>
      <h3 id="time-left">{'25:00'}</h3>
      <button id="start_stop">Start</button>
      <button id="reset">Reset</button>
    </div>
  );
};

export default Timer;
