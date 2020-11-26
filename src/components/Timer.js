const Timer = ({ startStop, reset, date }) => {
  return (
    <div id="timer-label">
      <p>timer: {`${date.getMinutes()}:${date.getSeconds()}`}</p>
      <p>Session</p>
      <h3 id="time-left">{'25:00'}</h3>
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
