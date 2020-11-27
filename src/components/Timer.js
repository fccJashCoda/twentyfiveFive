const Timer = ({ startStop, reset, time, sessionTime, breakTime, state }) => {
  const clock =
    sessionTime === 60 ? '60:00' : breakTime === 60 ? '60:00' : time;

  return (
    <div id="timer-label">
      <p>{state}</p>
      <h3 id="time-left">{clock}</h3>
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
