const Timer = ({ startStop, reset, time, state }) => {
  return (
    <div id="timer-label">
      <p>{state}</p>
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
